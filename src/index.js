import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
//import $ from "jquery";
import "popper.js/dist/popper-utils";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/Authentication/Context/auth-context";
import { ScheduleContextProvider } from "./components/MainScreenPages/Schedule/Context/schedule-context";
import { UsersContextProvider } from "./components/MainScreenPages/Users/context/users-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ScheduleContextProvider>
        <UsersContextProvider>        
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UsersContextProvider>
      </ScheduleContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
