//import { Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import "./Header.css";
import MenuOption from "../MenuOptions/MenuOption";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const Header = () => {
  //THIS IS ONE WAY TO MAKE THE HAMBURGER MENU WORK:
  const [expandMenu, setExpandMenu] = useState({ showCollapsedMenu: false });

  const toggleMenu = () => {
    setExpandMenu((previousState) => {
      return { showCollapsedMenu: !previousState.showCollapsedMenu };
    });
  };
  //State that tracks whether the user is logged in or not
  const [loggedIn, setLoggedIn] = useState(false);
  let options;
  //menu options for non-signed in users
  if (!loggedIn) {
    options = [
      { name: "Games", key: 0 },
      { name: "Sign In", key: 1 },
      { name: "Sign Up", key: 2 },
    ];
    //menu options for signed in users
  } else {
    options = [
      { name: "Games", key: 0 },
      { name: "My Profile", key: 1 },
      { name: "Sign Out", key: 2 },
    ];
  }

  // const homeClicked = () => {
  //   console.log("home option clicked");
  // };
  // const aboutClicked = () => {
  //   console.log("about option clicked");
  // };

  const signingIn = () => {
    setLoggedIn(true);
  };
  const signingOut = () => {
    setLoggedIn(false);
  };

  const navigate = useNavigate();
  const toHomePage = () => {
    navigate('/')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={toHomePage}>
            LCI Pickup Soccer
          </a>
          <button
            className="navbar-toggler border border-info text-info"
            data-toggle="collapse"
            data-target="#navbarNav"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className={"navbar-collapse collapse"} id="navbarNav"> */}
          <div
            className={
              expandMenu.showCollapsedMenu
                ? "collapse navbar-collapse active"
                : "collapse navbar-collapse"
            }
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {options.map((opt) => (
                <MenuOption
                  key={opt.key}
                  details={opt}
                  loggingIn={signingIn}
                  loggingOut={signingOut}
                />
              ))}
              {/* <li className="nav-item">
                <a className="nav-link" onClick={homeClicked}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={aboutClicked}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Next Games</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Contact</a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
