//import { Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import './Header.module.css'
import $ from "jquery";

const Header = () => {
  //THIS IS ONE WAY TO MAKE THE HAMBURGER MENU WORK:
  const[expandMenu, setExpandMenu] = useState({showCollapsedMenu: false})

  const toggleMenu = () => {
    setExpandMenu((previousState) => {
      return {showCollapsedMenu: !previousState.showCollapsedMenu}
    })
  }

  console.log(expandMenu.showCollapsedMenu)

  const showMenu = expandMenu.showCollapsedMenu ? "show" : "";
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            LCI Pickup Soccer
          </a>
            <button
              className="navbar-toggler border border-info"
              data-toggle="collapse"
              data-target="#navbarNav"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* <div className={"collapse navbar-collapse "} id="navbarNav"> */}
            <div className={"navbar-collapse collapse " + showMenu} id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
