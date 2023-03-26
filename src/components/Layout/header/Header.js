//import { Nav, Navbar } from "react-bootstrap";
import React, { useState, useContext } from "react";
import "./Header.css";
import MenuOption from "../MenuOptions/MenuOption";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Authentication/Context/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  //THIS IS ONE WAY TO MAKE THE HAMBURGER MENU WORK:
  const [expandMenu, setExpandMenu] = useState({ showCollapsedMenu: false });

  const toggleMenu = () => {
    setExpandMenu((previousState) => {
      return { showCollapsedMenu: !previousState.showCollapsedMenu };
    });
  };
  //State that tracks whether the user is logged in or not
  //const [loggedIn, setLoggedIn] = useState(false);
  let options;
  //console.log('Header.js', authCtx.isLoggedIn)
  //menu options for non-signed in users
  if (!authCtx.isLoggedIn) {
    options = [
      { name: "Schedule", key: 0 },
      { name: "Sign In", key: 1 },
      { name: "Sign Up", key: 2 },
    ];
    //menu options for signed in users
  } else if (authCtx.isLoggedIn && authCtx.isAdmin){
    options = [
      { name: "Manage Users", key: 0 },
      { name: "Schedule", key: 1 },
      {
        name:
          authCtx.displayName !== ""
            ? authCtx.displayName + " Profile"
            : "Update Profile",
        key: 2,
      },
      { name: "Sign Out", key: 3 },
    ];
  } else if (authCtx.isLoggedIn && !authCtx.isAdmin){
    options = [
      { name: "Schedule", key: 0 },
      {
        name:
          authCtx.displayName !== ""
            ? authCtx.displayName + " Profile"
            : "Update Profile",
        key: 1,
      },
      { name: "Sign Out", key: 2 },
    ];
  }

  const navigate = useNavigate();
  const toHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-3">
        <div className="container-fluid">
          {/*FOR BELOW LINE:  Line 61:11:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a 
        valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. 
        Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid */}
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
                <MenuOption key={opt.key} details={opt} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
