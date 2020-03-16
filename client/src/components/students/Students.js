import React from "react";

import { StudentList } from "./StudentList";
import StudentForm from "./StudentForm";

function Students() {
  return (
    <div className="students">
      <StudentForm />
      <StudentList />
    </div>
  );
}

export default Students;
