import { useContext } from "react";
import AuthContext from "../../Authentication/Context/auth-context";

const Users = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="container">
      {authCtx.isAdmin ? (
        <p>Users Page Coming</p>
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
