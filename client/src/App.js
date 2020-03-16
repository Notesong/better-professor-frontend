import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import { Header } from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { MentorDashboard } from "./components/MentorDashboard";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { StudentList } from "./components/StudentList";
import { Student } from "./components/Student";
import { Reminders } from "./components/Reminders";

import { GlobalProvider } from "./context/GlobalState";

import "./App.css";
import "./styles.scss";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute path="/dashboard" component={MentorDashboard} />
            <ProtectedRoute path="/studentlist" component={StudentList} />
            {/* https://stackoverflow.com/questions/42886626/how-to-pass-props-state-through-link-and-route-react-js */}
            <ProtectedRoute path="/student/:type" component={Student} />
            <ProtectedRoute path="/reminders" component={Reminders} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
