import React, { useState, useContext, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import Student from "./Student";

import { GlobalContext } from "../../context/GlobalState";

export const StudentList = () => {
  const { students, setStudents } = useContext(GlobalContext);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    // gets all the reminders from the API
    const getStudentList = async () => {
      await axiosWithAuth()
        .get(`/restricted/users/${sessionStorage.getItem("id")}/students/`)
        .then(res => {
          console.log(res);
          setStudents(res.data);
        })
        .catch(err => {
          setError("Error: Unable load reminders.");
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
            key={student.user_id}
            id={student.user_id}
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
