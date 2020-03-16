import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to={`/dashboard`}>Dashboard</Link>
      <Link to={`/students`}>Students</Link>
      <Link to={`/reminders`}>Reminders</Link>
    </div>
  );
}

export default Navbar;
