import React, { Component } from "react";
import "./styles/Navbar.scss";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="menu">
        <ul>
          <Link to="/articles">
            <div className="articles" />
          </Link>
          <Link to="/calendar">
            <div className="calendar" />
          </Link>
          <Link to="/garden">
            <div className="jardin" />
          </Link>
          <Link to="/user">
            <div className="user" />
          </Link>
        </ul>
      </div>
    );
  }
}

export default Navbar;
