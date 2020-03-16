import React from "react";

import ReminderForm from "./ReminderForm";
import { ReminderList } from "./ReminderList";
import TempStudentForm from "./TempStudentForm";

export const Reminders = () => {
  return (
    <div>
      <ReminderList />
      <ReminderForm />
      <TempStudentForm />
    </div>
  );
};
