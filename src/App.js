import Header from "./components/Layout/header/Header";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/MainScreenPages/Schedule/Schedule";
import Home from "./components/MainScreenPages/Home/Home";
import Profile from "./components/MainScreenPages/Profile/Profile";
import SignUpForm from "./components/Authentication/SignUpForm";
import SignInForm from "./components/Authentication/SignInForm";
import { useContext, useEffect } from "react";
import SignOutWarning from "./components/Authentication/SignOutWarning";
import { initializeApp } from "firebase/app";
import AuthContext from "./components/Authentication/Context/auth-context";
import ScheduleContext from "./components/MainScreenPages/Schedule/Context/schedule-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import EditGame from "./components/MainScreenPages/Schedule/EditGame";
import DeleteGame from "./components/MainScreenPages/Schedule/DeleteGame";

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
  const fbDb = getFirestore(firebaseApp);
  const authCtx = useContext(AuthContext);
  //console.log(authCtx.email, authCtx.isLoggedIn);

  //Variable to store all games from firebase
  //const [scheduleDocsRef, setScheduleDocsRef] = useState(null);

  const ScheduleCtx = useContext(ScheduleContext);
  //Getting the Schedule collection reference
  useEffect(() => {
    const colRef = collection(fbDb, "schedule");
    if (colRef !== null) {
      getDocs(colRef).then((res) => {
        ScheduleCtx.clearGames();
        res.docs.forEach((doc) => {
          ScheduleCtx.addGame(doc.data());
        });
      });
    }
  }, []);

  onAuthStateChanged(fbAuth, (user) => {
    if (user) {
      //console.log(user);
      authCtx.login(user.accessToken, user.email, user.uid);
      const docRef = doc(fbDb, "users", user.uid);
      //console.log(docRef);
      getDoc(docRef).then((res) => {
        //console.log(res.data().isAdmin);
        authCtx.updateAdminStatus(res.data().isAdmin);
        authCtx.updateProfile(
          res.data().displayName,
          res.data().phoneNumber,
          res.data().firstName,
          res.data().lastName
        );
      });
    }
  });

  return (
    <div className="App">
      <Header></Header>
      <main>
        <Routes>
          <Route
            path="/schedule"
            element={<Schedule firebaseConn={firebaseApp} />}
          />
          <Route
            path="/profile"
            element={<Profile firebaseConn={firebaseApp} />}
          />
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
          <Route
            path="/deletegame/:date"
            element={<DeleteGame firebaseConn={firebaseApp} />}
          />
          <Route
            path="/editgame/:date"
            element={<EditGame firebaseConn={firebaseApp} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
