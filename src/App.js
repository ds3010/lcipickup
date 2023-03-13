import Header from "./components/Layout/header/Header";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/MainScreenPages/Schedule/Schedule";
import Home from "./components/MainScreenPages/Home/Home";
import Profile from "./components/MainScreenPages/Profile/Profile";
import SignUpForm from "./components/Authentication/SignUpForm";
import SignInForm from "./components/Authentication/SignInForm";
import { useState } from "react";
import SignOutWarning from "./components/Authentication/SignOutWarning";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAlbXSydfzZtglP1kFpWW6zmL7N9v1El2s",
  authDomain: "lcipickup.firebaseapp.com",
  projectId: "lcipickup",
  storageBucket: "lcipickup.appspot.com",
  messagingSenderId: "434774837806",
  appId: "1:434774837806:web:d8e75d814a511cc100edbf",
  measurementId: "G-KV12R16JG1"
};

function App() {

  const firebaseApp = initializeApp(firebaseConfig);

  const [loggedIn, setLoggedIn] = useState(false)

  const onUserLogin = () => {
    //console.log('App.js NOW')
    setLoggedIn(true)
  }

  const onUserLogout = () => {
    setLoggedIn(false)
  }
  return (
    <div className="App">
      <Header userLoggedIn={loggedIn} onUserLogout={onUserLogout}></Header>
      <main>
        <Routes>
          <Route
            path="/schedule"
            element={<Schedule />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/signupform"
            element={<SignUpForm onUserLogin={onUserLogin} firebaseConn={firebaseApp}/>}
          />
          <Route
            path="/signinform"
            element={<SignInForm onUserLogin={onUserLogin} firebaseConn={firebaseApp}/>}
          />
          <Route
            path="/signout"
            element={<SignOutWarning onUserLogout={onUserLogout} firebaseConn={firebaseApp}/>}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
