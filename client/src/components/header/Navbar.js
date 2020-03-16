import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../../context/GlobalState";

import { Logout } from "./Logout";

function Navbar() {
  const { loggedIn, toggleLoggedIn } = useContext(GlobalContext);

  return (
    <div className="navbar">
      {loggedIn ? (
        <>
          <Link to={`/dashboard`}>Dashboard</Link>
          <Link to={`/students`}>Students</Link>
          <Link to={`/reminders`}>Reminders</Link>
        </>
      ) : (
        ""
      )}
      <Logout />
    </div>
  );
}

export default Navbar;
