import ModalScreen from "../UI/ModalScreen";
import { useRef, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "./Context/auth-context";
// import { doc, getDoc } from "firebase/firestore";
//import { getFirestore } from "firebase/firestore";

const SignInForm = (props) => {
  const username = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const fbApp = props.firebaseConn;
  const fbAuth = getAuth(fbApp);
  //const fbDb = getFirestore(fbApp);

  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('form submitted')
    if (password.current.value.length < 8) {
      setFormMessage("Password must be at least 8 characters");
      setFormSubmitted(false);
    } else if (!regularExpression.test(password.current.value)) {
      setFormMessage(
        "Password should contain at least one number and one special character"
      );
      setFormSubmitted(false);
    } else {
      signInWithEmailAndPassword(
        fbAuth,
        username.current.value,
        password.current.value
      )
        .then(() => {
          setFormMessage("Welcome Back!");
          setFormSubmitted(true);
          setTimeout(function () {
            onCloseHandler();
          }, 2000);
        })
        .catch((error) => {
          authCtx.logout();
          setFormSubmitted(false);
          setFormMessage(error.message.split(":")[1]);
        });
    }
  };

  const onCloseHandler = () => {
    navigate(-1);
  };

  return (
    <ModalScreen title="Sign In">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            ref={username}
            className="form-control"
            type="email"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            ref={password}
            className="form-control"
            type="password"
            id="password"
          />
          {/* <div className="invalid-feedback">Password not strong enough</div> */}
        </div>
        <br />
        <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
          Close
        </Button>
        <Button className="m-1" type="submit" variant="primary">
          Sign In
        </Button>
        {formSubmitted && formMessage === "Welcome Back!" && (
          <div className="alert alert-success">
            <strong>{formMessage}</strong>
          </div>
        )}
        {!formSubmitted &&
          formMessage !== "Welcome Back!" &&
          formMessage !== "" && (
            <div className="alert alert-danger">
              <strong>{formMessage}</strong>
            </div>
          )}
      </form>
    </ModalScreen>
  );
};
export default SignInForm;
