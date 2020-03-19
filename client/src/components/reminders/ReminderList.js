import React, { useState, useContext, useEffect } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { logout } from "../../utils/logout";

import Reminder from "./Reminder";

import { GlobalContext } from "../../context/GlobalState";

export const ReminderList = () => {
  const { toggleLoggedIn, reminders, setReminders } = useContext(GlobalContext);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    // gets all the reminders from the API
    const getReminderList = async () => {
      await axiosWithAuth()
        .get(`/restricted/users/${sessionStorage.getItem("id")}/messages/`)
        .then(res => {
          setReminders(res.data);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 401) {
              toggleLoggedIn();
              logout();
              window.location.href = "/";
            }
          }
          setError("Error: Unable load the reminders from the database.");
        });
    };
    getReminderList();
  }, []);

  return (
    <>
      {/* displays the reminders by mapping over reminders from the global variables */}
      <p className="error center">{error}</p>
      <div className="reminder_list">
        {reminders.map(reminder => (
          <Reminder
            key={reminder.reminder_id}
            id={reminder.reminder_id}
            proptitle={reminder.title}
            propmessage={reminder.message}
            propsendDate={reminder.send_date}
            recipient={reminder.student_id}
          />
        ))}
      </div>
    </>
  );
};
