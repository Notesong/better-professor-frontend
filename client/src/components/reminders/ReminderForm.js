import React, { useState, useContext, useEffect } from "react";
import DateTime from "react-datetime";
import Moment from "moment";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { logout } from "../../utils/logout";

import { GlobalContext } from "../../context/GlobalState";

import "../../styles/react-datetime.scss";

export default function ReminderForm() {
  const { toggleLoggedIn, addReminder, students, setStudents } = useContext(
    GlobalContext
  );

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState(Moment());
  const [studentId, setStudentId] = useState("Self");

  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    // gets the student list so that the user can select a student to send the message to
    const getStudentList = async () => {
      await axiosWithAuth()
        .get(`/restricted/users/${sessionStorage.getItem("id")}/students/`)
        .then(res => {
          if (res.data.length > 0) {
            setStudents(res.data);
          } else {
            setStudents([]);
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 401) {
              toggleLoggedIn();
              logout();
              window.location.href = "/";
            }
          }
          setError("Error: Unable load the students from the database.");
        });
    };
    getStudentList();
  }, []);

  // resets the state variables for the form
  const formReset = () => {
    showLoader(false);
    setTitle("");
    setMessage("");
    setStudentId("Self");
    setSendDate(Moment());
  };

  // submits the form to the API
  const onSubmit = e => {
    e.preventDefault();
    setError("");
    showLoader(true);

    axiosWithAuth()
      .post(`/restricted/users/${sessionStorage.getItem("id")}/messages`, {
        title: title,
        message: message,
        send_date: sendDate.format(),
        student_id: studentId
      })
      .then(res => {
        addReminder(res.data.NewMessage);
        formReset();
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            toggleLoggedIn();
            logout();
            window.location.href = "/";
          }
        }
        setError("Error: Unable to add the reminder to the database.");
        showLoader(false);
      });
  };

  return (
    <div className="reminder-form">
      <form className="form" onSubmit={onSubmit}>
        <h3 className="center">Set a Reminder</h3>
        {error && <p className="error center">{error}</p>}
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <select
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
          required
        >
          <option value="self">choose a student</option>
          {/* maps over students to list all students the user can send a message to */}
          {students.map(student => (
            <option key={student.student_id} value={student.student_id}>
              {student.name}
            </option>
          ))}
        </select>
        {/* allows the user to select a date */}
        <DateTime value={sendDate} onChange={e => setSendDate(e)} />
        <textarea
          value={message}
          onChange={e => setMessage(e.currentTarget.value)}
          placeholder="your message"
        />
        <button className="submit" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
