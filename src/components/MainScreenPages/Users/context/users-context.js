import React, { useState } from "react";

const UsersContext = React.createContext({
  users: [],
  addUser: (user) => {},
  clearUsers: () => {},
});

export const UsersContextProvider = (props) => {
  const [users, setUsers] = useState([]);

  const addUserHandler = (user) => {
    setUsers((prevState) => [...prevState, user]);
  };

  const clearUsersHandler = () => {
    setUsers([]);
  };

  const usersValue = {
    users: users,
    addUser: addUserHandler,
    clearUsers: clearUsersHandler,
  };

  return (
    <UsersContext.Provider value={usersValue}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
