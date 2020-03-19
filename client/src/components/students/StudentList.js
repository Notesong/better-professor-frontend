import React, { useState, useContext, useEffect } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { logout } from "../../utils/logout";

import Student from "./Student";

import { GlobalContext } from "../../context/GlobalState";

export const StudentList = () => {
  const { toggleLoggedIn, students, setStudents } = useContext(GlobalContext);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    const getStudentList = async () => {
      await axiosWithAuth()
        .get(`/restricted/users/${sessionStorage.getItem("id")}/students/`)
        .then(res => {
          if (!res.data.message) {
            setStudents(res.data);
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

  return (
    <>
      {/* displays the reminders by mapping over reminders from the global variables */}
      <p className="error center">{error}</p>
      <div className="student_list">
        {students.map(student => (
          <Student
            key={student.student_id}
            id={student.student_id}
            propname={student.name}
            propmajor={student.major}
            propemail={student.email}
            propphone={student.phone}
          />
        ))}
      </div>
    </>
  );
};
