import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { GlobalContext } from "../context/GlobalState";

export default function Login({ history }) {
  const { toggleLoggedIn } = useContext(GlobalContext);

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
      .post("/auth/login", { username: username, password: password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user_id);
        formReset();
        toggleLoggedIn();
        history.push("/dashboard");
      })
      .catch(err => {
        setError("Incorrect username or password.");
        localStorage.removeItem("token");
        formReset();
      });
  };

  return (
    <div className="login">
      {localStorage.getItem("token") ? (
        <>
          {toggleLoggedIn()}
          <Redirect to="/dashboard" />
        </>
      ) : (
        ""
      )}
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
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p className="center">
        <Link to={`/signup`}>Need to signup?</Link>
      </p>
    </div>
  );
}
