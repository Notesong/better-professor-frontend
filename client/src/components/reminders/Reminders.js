import React from "react";

import ReminderForm from "./ReminderForm";
import { ReminderList } from "./ReminderList";

export const Reminders = () => {
  return (
    <div>
      <ReminderList />
      <ReminderForm />
    </div>
  );
};
