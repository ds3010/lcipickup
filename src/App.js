import Header from "./components/Layout/header/Header";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/MainScreenPages/Schedule/Schedule";
import Home from "./components/MainScreenPages/Home/Home";
import Profile from "./components/MainScreenPages/Profile/Profile";
import SignUpForm from "./components/Authentication/SignUpForm";
import SignInForm from "./components/Authentication/SignInForm";
import { useState, useContext } from "react";
import SignOutWarning from "./components/Authentication/SignOutWarning";
import { initializeApp } from "firebase/app";
import AuthContext from "./components/Authentication/Context/auth-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlbXSydfzZtglP1kFpWW6zmL7N9v1El2s",
  authDomain: "lcipickup.firebaseapp.com",
  projectId: "lcipickup",
  storageBucket: "lcipickup.appspot.com",
  messagingSenderId: "434774837806",
  appId: "1:434774837806:web:d8e75d814a511cc100edbf",
  measurementId: "G-KV12R16JG1",
};

function App() {
  const firebaseApp = initializeApp(firebaseConfig);
  const fbAuth = getAuth(firebaseApp);

  const authCtx = useContext(AuthContext);
  console.log(authCtx.email, authCtx.isLoggedIn);

  onAuthStateChanged(fbAuth, (user) => {
    if (user) {
      authCtx.login(user.accessToken, user.email, user.uid);
    }
  });

  return (
    <div className="App">
      <Header></Header>
      <main>
        <Routes>
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/signupform"
            element={<SignUpForm firebaseConn={firebaseApp} />}
          />
          <Route
            path="/signinform"
            element={<SignInForm firebaseConn={firebaseApp} />}
          />
          <Route
            path="/signout"
            element={<SignOutWarning firebaseConn={firebaseApp} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
