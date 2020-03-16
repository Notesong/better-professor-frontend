import React from "react";
import { Link } from "react-router-dom";

export const MentorDashboard = () => {
  return (
    <div className="dashboard">
      <div className="box students_link">
        <Link to={`/students`}>Students</Link>
      </div>
      <div className="box reminders_link">
        <Link to={`/reminders`}>Reminders</Link>
      </div>
    </div>
  );
};
