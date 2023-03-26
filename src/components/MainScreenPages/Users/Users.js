import { useContext } from "react";
import AuthContext from "../../Authentication/Context/auth-context";
import UsersContext from "./context/users-context";
import User from "./User";

const Users = (props) => {
  const authCtx = useContext(AuthContext);
  const usersCtx = useContext(UsersContext);
  let rearrangedUsers = []
  let usersContent
  //let otherUsers
  //console.log(props.firebaseConn)
  const myUserIndex = usersCtx.users.findIndex(user => user.email === authCtx.email)
  
  if (myUserIndex !== -1) {
    const allUsers = [...usersCtx.users]
    const myUser = allUsers[myUserIndex]
    allUsers.splice(myUserIndex, 1)
    allUsers.unshift(myUser)
    rearrangedUsers = [...allUsers]
    //console.log(myUser)
    //console.log(allUsers)
  }

  if (rearrangedUsers.length > 0) {  
    console.log("We are here")
    usersContent = rearrangedUsers.map(user => {
      console.log(user)
      return <User user={user} firebaseConn={props.firebaseConn}></User>
    })
  }

  return (
    <div className="container">
      <div className="text-center"><h3>Players</h3></div>
      <br></br>
      {authCtx.isAdmin ? (
        <ul className="list-group mb-5">{usersContent}</ul>
      ) : (
        <div className="alert alert-danger text-center">
          <strong>
            You do not have enough permissions to render this page
          </strong>
        </div>
      )}
    </div>
  );
};

export default Users;
