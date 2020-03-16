import React from "react";
import Navbar from "./Navbar";
import { Logout } from "./Logout";

export const Header = () => {
  return (
    <div className="header">
      <h1>Better Professor</h1>
      <Navbar />
      <Logout />
    </div>
  );
};
