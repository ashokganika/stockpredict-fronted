import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./nav.css";

function Header(props) {
  const [token, settoken] = useState("");
  const [user, setuser] = useState("");
  useEffect(() => {
    const token =
      localStorage.getItem("token") && localStorage.getItem("token");
    const name =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    settoken(token);
    setuser(name);
  }, [token, user]);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    console.log("props", props);
    settoken("");
    setuser("");
    props.history.push("/login");
  };

  const auth = token ? (
    <div className="authcontainer">
      <li className="nav-item authbtn">
        <div className="nav-link btn btn-outline-info user">{user}</div>
      </li>

      <li className="nav-item authbtn">
        <div className="nav-link btn btn-outline-info" onClick={handleLogout}>
          Logout
        </div>
      </li>
    </div>
  ) : (
    <div className="authcontainer">
      <li className="nav-item authbtn">
        <NavLink className="nav-link btn btn-outline-info" to="/register">
          Sign Up
        </NavLink>
      </li>

      <li className="nav-item authbtn">
        <NavLink className="nav-link btn btn-outline-info" to="/login">
          Log In
        </NavLink>
      </li>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-dark ">
      <NavLink to="/">
        <a className="navbar-brand logo" id="nav-logo">
          StockPredict
        </a>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active navitem">
            <NavLink to="/">
              <a className="nav-link">Home</a>
            </NavLink>
          </li>
          <li className="nav-item navitem ">
            <NavLink to="/view-stock">
              <a className="nav-link">View Stock</a>
            </NavLink>
          </li>
          {auth}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Header);
