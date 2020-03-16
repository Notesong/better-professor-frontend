import React, { useState, useContext } from "react";
import DateTime from "react-datetime";
import Moment from "moment";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { GlobalContext } from "../../context/GlobalState";

import "../../styles/react-datetime.scss";

const Reminder = ({ id, proptitle, propmessage, propsendDate, recipient }) => {
  const { editReminder, deleteReminder, students } = useContext(GlobalContext);

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(proptitle);
  const [message, setMessage] = useState(propmessage);
  const [sendDate, setSendDate] = useState(Moment(propsendDate));
  const [studentId, setStudentId] = useState(recipient);

  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState("");

  // resets state variables to reset form
  const formReset = () => {
    showLoader(false);
    setTitle(proptitle);
    setMessage(propmessage);
    setStudentId(recipient);
    setSendDate(propsendDate);
  };

  const onSubmit = e => {
    e.preventDefault();
    setError("");
    showLoader(true);

    // submit the edited reminder to the API
    axiosWithAuth()
      .put(`/restricted/users/${sessionStorage.getItem("id")}/messages/${id}`, {
        title: title,
        message: message,
        send_date: sendDate.format(),
        student_id: studentId
      })
      .then(res => {
        editReminder(res.data.MessageUpdated);
        formReset();
        setIsEditing(false);
      })
      .catch(err => {
        setError("Unable to update reminder.");
        showLoader(false);
      });
  };

  // show editing form to allow user to edit reminder
  const edit = e => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);
  };

  // cancel displaying edit reminder form
  const cancel = e => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(false);
    setError("");
  };

  // delete a reminder
  function delReminder(reminder_id) {
    axiosWithAuth()
      .delete(
        `/restricted/users/${sessionStorage.getItem(
          "id"
        )}/messages/${reminder_id}`
      )
      .then(res => {
        deleteReminder(reminder_id);
      })
      .catch(err => {
        setError("Error: Unable delete reminder.");
      });
  }

  return (
    <div className="reminder">
      {!isEditing ? (
        <>
          {/* the reminder itself */}
          <div className="top-of-reminder">
            <button onClick={edit} className="edit-button">
              Edit
            </button>
            <button
              className="message-delete-button"
              onClick={e => {
                e.stopPropagation();
                delReminder(id);
              }}
            >
              X
            </button>
          </div>
          <h3>{proptitle}</h3>
          {/* maps over student data to get the student's name based off the recipient's id */}
          <h5>
            {students.map(student => {
              if (student.student_id === recipient) {
                return student.name;
              }
            })}
          </h5>
          <h5>{Moment(propsendDate).format("MM-DD-YYYY")}</h5>
          <p>{propmessage}</p>
        </>
      ) : (
        // reminder form to edit the reminder
        // only shows if user wants to edit the reminder
        <form className="edit-form" onSubmit={onSubmit}>
          <h3 className="center">Edit Reminder</h3>
          {error && <p className="error center">{error}</p>}
          <input
            type="text"
            name="title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <select
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
          >
            <option value="self">Choose a student</option>
            {/* maps over students to list all students the user can send a message to */}
            {students.map(student => (
              <option key={student.student_id} value={student.student_id}>
                {student.name}
              </option>
            ))}
          </select>
          <DateTime value={sendDate} onChange={e => setSendDate(e)} />
          <textarea
            value={message}
            onChange={e => setMessage(e.currentTarget.value)}
            placeholder="your message"
          />
          <div className="edit-form-buttons">
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button className="submit" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Reminder;
