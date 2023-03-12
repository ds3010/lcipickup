import Header from "./components/Layout/header/Header";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/MainScreenPages/Schedule/Schedule";
import Home from "./components/MainScreenPages/Home/Home";
import Profile from "./components/MainScreenPages/Profile/Profile";
import SignUpForm from "./components/Authentication/SignUpForm";
import SignInForm from "./components/Authentication/SignInForm";
import { useState } from "react";
import SignOutWarning from "./components/Authentication/SignOutWarning";

function App() {

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
            element={<SignUpForm onUserLogin={onUserLogin}/>}
          />
          <Route
            path="/signinform"
            element={<SignInForm onUserLogin={onUserLogin}/>}
          />
          <Route
            path="/signout"
            element={<SignOutWarning onUserLogout={onUserLogout}/>}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
