import React, { useContext } from "react";

import { GlobalContext } from "../../context/GlobalState";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const Logout = () => {
  const { loggedIn, toggleLoggedIn } = useContext(GlobalContext);

  // logout function that clears local storage and returns user to the login form
  function logout(e) {
    e.preventDefault();
    sessionStorage.clear();
    toggleLoggedIn();

    axiosWithAuth()
      .delete()
      .then(res => {})
      .catch(err => {});

    window.location.href = "/";
  }

  function login(e) {
    e.preventDefault();
    window.location.href = "/";
  }

  return (
    <>
      {/* Only logout show button if logged in */}
      {!loggedIn ? (
        <button onClick={login}>Login</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </>
  );
};
