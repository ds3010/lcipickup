import ModalScreen from "../UI/ModalScreen";
import { useRef, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AuthContext from "./Context/auth-context";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = (props) => {
  const username = useRef();
  const password = useRef();
  const password2 = useRef();

  const fbApp = props.firebaseConn;
  const fbAuth = getAuth(fbApp);
  const fbdB = getFirestore(fbApp);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('form submitted')
    if (password.current.value !== password2.current.value) {
      setFormMessage("Passwords do not match");
      setFormSubmitted(false);
    } else if (password.current.value.length < 8) {
      setFormMessage("Password must be at least 8 characters");
      setFormSubmitted(false);
    } else if (!regularExpression.test(password.current.value)) {
      setFormMessage(
        "Password should contain at least one number and one special character"
      );
      setFormSubmitted(false);
    } else {
      //Singing Up into Firebase
      createUserWithEmailAndPassword(
        fbAuth,
        username.current.value,
        password.current.value
      )
        .then((res) => {
          //console.log(res);
          //Creating a user collection document
          const usersRef = doc(fbdB, "users", res.user.uid);
          setDoc(
            usersRef,
            {
              email: res.user.email,
              firstName: "",
              lastName: "",
              gameToAdd: {},
              displayName: "",
              phoneNumber: "",
              isAdmin: false,
              isOrganizer: false,
            },
            { merge: true }
          );
          setFormMessage("Welcome!");
          setFormSubmitted(true);
          authCtx.login(res.user.accessToken, res.user.email, res.user.uid);
          authCtx.updateProfile("", "", "", "");
          authCtx.updateAdminStatus(false);
          setTimeout(function () {
            onCloseHandler();
          }, 2000);
        })
        .catch((error) => {
          setFormMessage(error.message.split(":")[1]);
          setFormSubmitted(false);
        });
    }
  };

  //console.log(authCtx.userId)

  // if (setFormSubmitted) {
  //     setInterval(props.onUserLogin(), 2000);
  //     onCloseHandler();
  // }

  const onCloseHandler = () => {
    navigate(-1);
  };

  return (
    <ModalScreen title="Sign Up">
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
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            ref={password2}
            className="form-control"
            type="password"
            id="password2"
          />
          {/* <div className="invalid-feedback">Password does not match</div> */}
        </div>
        <br />
        <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
          Close
        </Button>
        <Button className="m-1" type="submit" variant="primary">
          Sign Up
        </Button>
        {formSubmitted && formMessage === "Welcome!" && (
          <div className="alert alert-success">
            <strong>{formMessage}</strong>
          </div>
        )}
        {!formSubmitted && formMessage !== "Welcome!" && formMessage !== "" && (
          <div className="alert alert-danger">
            <strong>{formMessage}</strong>
          </div>
        )}
      </form>
    </ModalScreen>
  );
};
export default SignUpForm;
