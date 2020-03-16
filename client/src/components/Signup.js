import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Signup({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState("");

  const formReset = () => {
    showLoader(false);
    setUsername("");
    setPassword("");
  };

  const onSubmit = e => {
    e.preventDefault();

    setError("");
    showLoader(true);

    axiosWithAuth()
      .post("/auth/register", { username: username, password: password })
      .then(res => {
        formReset();
        history.push("/");
      })
      .catch(err => {
        setError("Invalid username or password.");
        sessionStorage.removeItem("token");
        formReset();
      });
  };

  return (
    <div className="signup">
      {sessionStorage.getItem("token") ? <Redirect to="/dashboard" /> : ""}
      <form className="form" onSubmit={onSubmit}>
        {error && <p className="error center">{error}</p>}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <button className="submit" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <p className="center">
        <Link to={`/`}>Already a user?</Link>
      </p>
    </div>
  );
}
