import React, { useState, useContext } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { GlobalContext } from "../../context/GlobalState";

const Student = ({ id, propname, propmajor, propemail, propphone }) => {
  const { editStudent, deleteStudent } = useContext(GlobalContext);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(propname);
  const [major, setMajor] = useState(propmajor);
  const [email, setEmail] = useState(propemail);
  const [phone, setPhone] = useState(propphone);

  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState("");

  // resets state variables to reset form
  const formReset = () => {
    showLoader(false);
    setName(propname);
    setMajor(propmajor);
    setEmail(propemail);
    setPhone(propphone);
  };

  const onSubmit = e => {
    e.preventDefault();
    setError("");
    showLoader(true);

    // submit the edited reminder to the API
    axiosWithAuth()
      .put(`/restricted/users/${sessionStorage.getItem("id")}/messages/${id}`, {
        name: name,
        major: major,
        email: email,
        phone: phone
      })
      .then(res => {
        editStudent(res.data.MessageUpdated);
        formReset();
        setIsEditing(false);
      })
      .catch(err => {
        setError("Error: Unable to update student.");
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
  function delReminder(id) {
    axiosWithAuth()
      .delete(
        `/restricted/users/${sessionStorage.getItem("id")}/students/${id}`
      )
      .then(res => {
        deleteStudent(id);
      })
      .catch(err => {
        setError("Error: Unable delete student.");
      });
  }

  return (
    <div className="student">
      {!isEditing ? (
        <>
          {/* the reminder itself */}
          <div className="top-of-student">
            <button onClick={edit} className="edit-button">
              Edit
            </button>
            <button
              className="student-delete-button"
              onClick={e => {
                e.stopPropagation();
                delReminder(id);
              }}
            >
              X
            </button>
          </div>
          <h3>{propname}</h3>
          <p>Major: {propmajor}</p>
          <p>Email: {propemail}</p>
          <p>Phone: {propphone}</p>
          <button>Projects</button>
        </>
      ) : (
        // reminder form to edit the reminder
        // only shows if user wants to edit the reminder
        <form className="edit-form" onSubmit={onSubmit}>
          <h3 className="center">Edit Student</h3>
          {error && <p className="error center">{error}</p>}
          <input
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="name"
          />
          <input
            type="text"
            name="major"
            onChange={e => setMajor(e.target.value)}
            value={major}
            placeholder="major"
          />
          <input
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
          <input
            type="phone"
            name="phone"
            onChange={e => setPhone(e.target.value)}
            value={phone}
            placeholder="phone"
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

export default Student;
