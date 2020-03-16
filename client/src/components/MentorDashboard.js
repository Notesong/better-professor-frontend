import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

import addStudent from "../images/addstudents.png";

export const MentorDashboard = () => {
  const { students } = useContext(GlobalContext);

  return (
    <div className="dashboard">
      {students.length === 0 ? (
        <img
          src={addStudent}
          alt="Add a Student First"
          className="add-student-image"
        />
      ) : (
        <></>
      )}
      <div className="box students_link">
        <Link to={`/students`}>Students</Link>
      </div>
      <div className="box reminders_link">
        <Link to={`/reminders`}>Reminders</Link>
      </div>
    </div>
  );
};
