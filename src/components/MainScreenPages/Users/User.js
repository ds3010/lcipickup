import { Button } from "react-bootstrap";
import AuthContext from "../../Authentication/Context/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const User = (props) => {
  const authCtx = useContext(AuthContext);
  //console.log(props);

  const navigate = useNavigate();

  const onOpenDetailsHandler = () => {
    navigate("/userdetails/" + props.user.email);
  };

  const onMakeAdminHandler = () => {
    navigate("/makeadmin/" + props.user.email);
  };

  //console.log(props.firebaseConn)
  return authCtx.email === props.user.email ? (
    <li className="list-group-item list-group-item-danger">
      <div className="row">
        <div className="col-sm text-start">
          <strong onClick={onOpenDetailsHandler}>{props.user.email}</strong>
        </div>
        <div className="col-sm text-center" onClick={onOpenDetailsHandler}>
          {props.user.firstName} {props.user.lastName}
        </div>
        {props.user.isAdmin ? (
          <div className="col-sm text-end">
            <strong className="text-danger">Admin</strong>
          </div>
        ) : (
          <div className="col-sm text-end">
            <Button className="btn-success">Make Admin</Button>
          </div>
        )}
      </div>
    </li>
  ) : (
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm text-start">
          <strong onClick={onOpenDetailsHandler}>{props.user.email}</strong>
        </div>
        <div className="col-sm text-center" onClick={onOpenDetailsHandler}>
          {props.user.firstName} {props.user.lastName}
        </div>
        {props.user.isAdmin ? (
          <div className="col-sm text-end">
            <strong className="text-danger">Admin</strong>
          </div>
        ) : (
          <div className="col-sm text-end">
            <Button className="btn-success" onClick={onMakeAdminHandler}>
              Make Admin
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default User;
