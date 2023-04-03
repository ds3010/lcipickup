import Header from "./components/Layout/header/Header";
import { Route, Routes } from "react-router-dom";
import Schedule from "./components/MainScreenPages/Schedule/Schedule";
import Home from "./components/MainScreenPages/Home/Home";
import Profile from "./components/MainScreenPages/Profile/Profile";
import SignUpForm from "./components/Authentication/SignUpForm";
import SignInForm from "./components/Authentication/SignInForm";
import { useContext, useEffect, useState } from "react";
import SignOutWarning from "./components/Authentication/SignOutWarning";
import { initializeApp } from "firebase/app";
import AuthContext from "./components/Authentication/Context/auth-context";
import ScheduleContext from "./components/MainScreenPages/Schedule/Context/schedule-context";
import UsersContext from "./components/MainScreenPages/Users/context/users-context";
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
import Users from "./components/MainScreenPages/Users/Users";
import UserDetails from "./components/MainScreenPages/Users/UserDetails";
import MakeAdminWarning from "./components/MainScreenPages/Users/MakeAdminWarning";
import PlayGame from "./components/MainScreenPages/Schedule/PlayGame";
import Success from "./components/MainScreenPages/Payment/Success";
import Cancel from "./components/MainScreenPages/Payment/Cancel";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJ_ID,
  storageBucket: process.env.REACT_APP_STORE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDERID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURE_ID,
};

console.log(process.env.REACT_APP_FB_KEY);
console.log(process.env.REACT_APP_AUTH_DOMAIN);
console.log(process.env.REACT_APP_PROJ_ID);
console.log(process.env.REACT_APP_STORE_BUCKET);
console.log(process.env.REACT_APP_MESSAGE_SENDERID);
console.log(process.env.REACT_APP_APP_ID);
console.log(process.env.REACT_APP_MEASURE_ID);
// const firebaseConfig = {
//   apiKey: "AIzaSyAlbXSydfzZtglP1kFpWW6zmL7N9v1El2s",
//   authDomain: "lcipickup.firebaseapp.com",
//   projectId: "lcipickup",
//   storageBucket: "lcipickup.appspot.com",
//   messagingSenderId: "434774837806",
//   appId: "1:434774837806:web:d8e75d814a511cc100edbf",
//   measurementId: "G-KV12R16JG1",
// };

function App() {
  const firebaseApp = initializeApp(firebaseConfig);
  const fbAuth = getAuth(firebaseApp);
  const fbDb = getFirestore(firebaseApp);
  const authCtx = useContext(AuthContext);
  const ScheduleCtx = useContext(ScheduleContext);
  const usersCtx = useContext(UsersContext);
  //Getting the Schedule collection reference

  const [gameDownloadReattempt, setgameDownloadReattempt] = useState(1);

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      //console.log("Auth state changed")
      if (user) {
        //console.log("User exists")
        //console.log(user);
        authCtx.login(user.accessToken, user.email, user.uid);
        const docRef = doc(fbDb, "users", user.uid);
        getDoc(docRef).then((res) => {
          //console.log("Inside getDoc in App.js");
          //console.log("isAdmin:", res.data().isAdmin);
          authCtx.updateAdminStatus(res.data().isAdmin);
          authCtx.updategameToPlay(res.data().gameToPlay);
          authCtx.updateProfile(
            res.data().displayName,
            res.data().phoneNumber,
            res.data().firstName,
            res.data().lastName
          );
        });
      }
    });
    const colRef = collection(fbDb, "schedule");
    const usersColRef = collection(fbDb, "users");
    //The following code is intended to save all games in the schedule context
    //console.log("Use Effect")
    if (colRef !== null) {
      getDocs(colRef).then((res) => {
        console.log("clearing games...");
        ScheduleCtx.clearGames();

        console.log("getting games");
        console.log("res:", res);
        res.docs.forEach((doc) => {
          //console.log("game: " + doc)
          ScheduleCtx.addGame(doc.data());
        });
        if (gameDownloadReattempt > 0 && res.docs.length === 0) {
          console.log("Reattempting to download games...");
          setgameDownloadReattempt(0);
        }
      });
    }

    //The following code is intended to save all users in the users context
    if (!!authCtx.isAdmin && authCtx.isAdmin) {
      //console.log("this user is an admin so I am getting users")
      if (usersColRef !== null) {
        //console.log('getting users')
        getDocs(usersColRef).then((res) => {
          usersCtx.clearUsers();
          res.docs.forEach((doc) => {
            //console.log(doc.data());
            usersCtx.addUser(doc.data());
          });
        });
      }
    }
  }, [authCtx.isAdmin]);

  // onAuthStateChanged(fbAuth, (user) => {
  //   if (user) {
  //     //console.log(user);
  //     authCtx.login(user.accessToken, user.email, user.uid);
  //     const docRef = doc(fbDb, "users", user.uid);

  //     //console.log('App.js, onAuthStateChanged')
  //     getDoc(docRef).then((res) => {
  //       //console.log("Inside getDoc in App.js");
  //       //console.log("isAdmin:", res.data().isAdmin);
  //       authCtx.updateAdminStatus(res.data().isAdmin);
  //       authCtx.updategameToPlay(res.data().gameToPlay)
  //       authCtx.updateProfile(
  //         res.data().displayName,
  //         res.data().phoneNumber,
  //         res.data().firstName,
  //         res.data().lastName
  //       );
  //     });
  //   }
  // });
  //console.log(authCtx.userId)
  // const navigate = useNavigate();

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
          <Route path="/users" element={<Users firebaseConn={firebaseApp} />} />
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
            path="/play/:date/:gameId"
            element={<PlayGame firebaseConn={firebaseApp} />}
          />
          <Route
            path="/aaokyU3dphUVoJEMV6hQTaEhLiEn9z8eUTWugdCHNE014sp8zfEiV6YU9MaLtNwQi97H7WBhBHo21zqunD0ZgBgAJWj7fhqZy0BZ"
            element={<Success firebaseConn={firebaseApp} />}
          />
          <Route
            path="/cancel"
            element={<Cancel firebaseConn={firebaseApp} />}
          />
          <Route
            path="/userdetails/:userid"
            element={<UserDetails firebaseConn={firebaseApp} />}
          />
          <Route
            path="/makeadmin/:userid"
            element={<MakeAdminWarning firebaseConn={firebaseApp} />}
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
