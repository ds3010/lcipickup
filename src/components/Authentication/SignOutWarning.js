import ModalScreen from "../UI/ModalScreen";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "./Context/auth-context";
import { getAuth, signOut } from "firebase/auth";

const SignOutWarning = (props) => {
  //const [isLoggedOut, setIsLoggedOut] = useState(false);
  const authCtx = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null);

  const fbApp = props.firebaseConn;
  const fbAuth = getAuth(fbApp);

  const navigate = useNavigate();

  const onCloseHandler = () => {
    navigate(-1);
  };

  const onLogoutHandler = () => {
    //setIsLoggedOut(true);
    signOut(fbAuth)
      .then((res) => {
        //console.log(res);
        authCtx.logout();
        setTimeout(function () {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(error.message.split(":")[1]);
      });
  };

  return (
    <ModalScreen title="Sign Out">
      <p>Are you sure you want to sign out?</p>
      <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
        Close
      </Button>
      <Button className="m-1" variant="primary" onClick={onLogoutHandler}>
        Sign Out
      </Button>
      {!authCtx.isLoggedIn && (
        <div className="alert alert-success">
          <strong>Thank You! See you later</strong>
        </div>
      )}
      {!!errorMessage && (
        <div className="alert alert-danger">
          <strong>{errorMessage}</strong>
        </div>
      )}
    </ModalScreen>
  );
};

export default SignOutWarning;
