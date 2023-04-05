import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  email: "",
  userId: "",
  firstName: "",
  lastName: "",
  displayName: "",
  isLoggedIn: false,
  isAdmin: false,
  isOrganizer: false,
  gameToPlay: {},
  phoneNumber: "",
  updategameToPlay: (game) => {},
  updateProfile: (displayName, phoneNumber, firstName, lastName) => {},
  updateAdminStatus: (isAdmin) => {},
  updateOrgStatus: (isOrganizer) => {},
  login: (token, email, userId) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [gameToPlay, setgameToPlay] = useState({});

  const userIsLoggedIn = !!token;
  // console.log("In Context: ", userIsLoggedIn);

  const loginHandler = (token, email, userId) => {
    setToken(token);
    setEmail(email);
    setUserId(userId);
  };
  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setEmail(null);
    setdisplayName(null);
    setfirstName(null);
    setlastName(null);
    setphoneNumber(null);
    setgameToPlay({});
    setIsAdmin(null);
    setIsOrg(false);
  };

  //NEW
  const updateProfileHandler = (
    displayName,
    phoneNumber,
    firstName,
    lastName
  ) => {
    setdisplayName(displayName);
    setphoneNumber(phoneNumber);
    setfirstName(firstName);
    setlastName(lastName);
  };

  const updategameToPlayHandler = (game) => {
    setgameToPlay(game);
  };

  const adminHandler = (isAdmin) => {
    //console.log("Is this user admin?:", isAdmin);
    setIsAdmin(isAdmin);
  };

  const orgHandler = (isOrg) => {
    setIsOrg(isOrg);
  };

  const contextValue = {
    token: token,
    email: email,
    userId: userId,
    displayName: displayName,
    firstName: firstName,
    lastName: lastName,
    isLoggedIn: userIsLoggedIn,
    isAdmin: isAdmin,
    isOrganizer: isOrg,
    login: loginHandler,
    logout: logoutHandler,
    updateAdminStatus: adminHandler,
    updateOrgStatus: orgHandler,
    gameToPlay: gameToPlay,
    phoneNumber: phoneNumber,
    updateProfile: updateProfileHandler,
    updategameToPlay: updategameToPlayHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
