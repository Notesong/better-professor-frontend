export default (state, action) => {
  switch (action.type) {
    // login check and toggle reducer
    case "TOGGLE_LOGGED_IN":
      if (sessionStorage.getItem("token")) {
        return {
          ...state,
          loggedIn: true
        };
      } else {
        return {
          ...state,
          loggedIn: false
        };
      }
    // reminder reducers
    case "SET_REMINDERS":
      return {
        ...state,
        reminders: action.payload
      };
    case "ADD_REMINDER":
      return {
        ...state,
        reminders: [action.payload, ...state.reminders]
      };
    case "DELETE_REMINDER":
      const filtered_out_reminder = state.reminders.filter(
        reminder => action.payload !== reminder.reminder_id
      );
      return {
        ...state,
        reminders: filtered_out_reminder
      };
    case "EDIT_REMINDER":
      const filtered_out_reminder_to_edit = state.reminders.filter(
        reminder => action.payload.reminder_id !== reminder.reminder_id
      );
      return {
        ...state,
        reminders: [...filtered_out_reminder_to_edit, action.payload]
      };
    // student reducers
    case "SET_STUDENTS":
      return {
        ...state,
        students: action.payload
      };
    case "ADD_STUDENT":
      return {
        ...state,
        students: [action.payload, ...state.students]
      };
    case "DELETE_STUDENT":
      const filtered_out_student = state.students.filter(
        student => action.payload !== student.student_id
      );
      return {
        ...state,
        students: filtered_out_student
      };
    case "EDIT_STUDENT":
      const filtered_out_student_to_edit = state.students.filter(
        student => action.payload.student_id !== student.student_id
      );
      return {
        ...state,
        students: [...filtered_out_student_to_edit, action.payload]
      };
    default:
      return state;
  }
};
