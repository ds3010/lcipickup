import Header from "./components/Layout/header/Header";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/MainScreenPages/Schedule/Schedule";
import Home from "./components/MainScreenPages/Home/Home";
import Profile from "./components/MainScreenPages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Header></Header>
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
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
