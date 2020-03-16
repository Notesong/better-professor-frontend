import React, { createContext, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";

// Initial state
const initialState = {
  loggedIn: Boolean(sessionStorage.getItem("token")),
  students: [],
  reminders: [],
  projects: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function setReminders(reminders) {
    dispatch({
      type: "SET_REMINDERS",
      payload: reminders
    });
  }

  function addReminder(newReminder) {
    dispatch({
      type: "ADD_REMINDER",
      payload: newReminder
    });
  }

  function deleteReminder(reminder_id) {
    dispatch({
      type: "DELETE_REMINDER",
      payload: reminder_id
    });
  }

  function editReminder(reminder) {
    dispatch({
      type: "EDIT_REMINDER",
      payload: reminder
    });
  }

  function setStudents(studentList) {
    dispatch({
      type: "SET_STUDENTS",
      payload: studentList
    });
  }

  function addStudent(student) {
    dispatch({
      type: "ADD_STUDENT",
      payload: student
    });
  }

  function toggleLoggedIn() {
    dispatch({
      type: "TOGGLE_LOGGED_IN"
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        loggedIn: state.loggedIn,
        userInfo: state.userInfo,
        students: state.students,
        reminders: state.reminders,
        projects: state.projects,
        setReminders,
        addReminder,
        deleteReminder,
        editReminder,
        setStudents,
        addStudent,
        toggleLoggedIn
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
