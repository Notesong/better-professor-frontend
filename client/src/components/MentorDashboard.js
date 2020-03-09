import React from 'react';
import { Link } from "react-router-dom";

export const MentorDashboard = () => {
    return (
        <div>
            <Link to={`/studentlist`}>StudentList</Link>
            <br />
            <Link to={`/reminders`}>Reminders</Link>
        </div>
    )
}
