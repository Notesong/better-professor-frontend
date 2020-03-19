import React, { useState, useContext } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { logout } from "../../utils/logout";

import { GlobalContext } from "../../context/GlobalState";

export default function StudentForm() {
  const { toggleLoggedIn, addStudent } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState("");

  const formReset = () => {
    showLoader(false);
    setError("");
    setName("");
    setMajor("");
    setEmail("");
    setPhone("");
  };

  const onSubmit = e => {
    e.preventDefault();

    setError("");
    showLoader(true);

    axiosWithAuth()
      .post(`/restricted/users/${sessionStorage.getItem("id")}/students`, {
        name: name,
        major: major,
        email: email,
        phone: phone
      })
      .then(res => {
        addStudent(res.data.NewStudent);
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
        setError("Error: Unable to post the student to the database.");
        showLoader(false);
      });
  };

  return (
    <div className="student-form">
      <form className="form" onSubmit={onSubmit}>
        <h3 className="center">Add a Student</h3>
        {error && <p className="error center">{error}</p>}
        <input
          type="text"
          placeholder="student name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="major"
          onChange={e => setMajor(e.target.value)}
          value={major}
        />
        <input
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="phone"
          placeholder="phone"
          onChange={e => setPhone(e.target.value)}
          value={phone}
        />
        <button className="submit" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
