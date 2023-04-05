import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import AuthContext from "../../Authentication/Context/auth-context";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const Profile = (props) => {
  const displayName = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const phonenumber = useRef();
  const password1 = useRef();
  const password2 = useRef();
  const currentpassword = useRef();

  const [profileChanged, setProfileChanged] = useState(false);
  const [passwordError, setpasswordError] = useState("");
  const [passwordchanged, setpasswordchanged] = useState(false);

  const authCtx = useContext(AuthContext);
  const fbDb = getFirestore(props.firebaseConn);
  const fbAuth = getAuth(props.firebaseConn);
  const currentUser = fbAuth.currentUser;
  //console.log("Profile")
  // console.log("CONTEXT:");
  // console.log(authCtx.displayName);
  // console.log(authCtx.firstName);
  // console.log(authCtx.lastName);
  // console.log(authCtx.phoneNumber);

  const navigate = useNavigate();
  const minNumberofChars = 8;
  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

  const onPasswordChange = (e) => {
    e.preventDefault();
    if (
      currentpassword.current.value !== "" ||
      password1.current.value !== "" ||
      password2.current.value !== ""
    ) {
      if (password1.current.value !== password2.current.value) {
        setpasswordError(
          "Passwords do not match, please retype passwords or exit"
        );
      } else if (password1.current.value.length < minNumberofChars) {
        setpasswordError(
          "Password must be at least 8 characters, please try again"
        );
      } else if (!regularExpression.test(password1.current.value)) {
        console.log("Failed special characters requirement");
        setpasswordError(
          "Password must contain at least one number and one of these special characters: !@#$%^&*"
        );
      } else {
        const userCredentials = EmailAuthProvider.credential(
          currentUser.email,
          currentpassword.current.value
        );
        reauthenticateWithCredential(currentUser, userCredentials)
          .then((res) => {
            console.log(res);
            updatePassword(currentUser, password1.current.value)
              .then(() => {
                setpasswordchanged(true);
                setpasswordError("");
              })
              .catch((error) => {
                setpasswordError(error.message);
              });
          })
          .catch((error) => {
            setpasswordError("Current password is incorrect");
          });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //Updating password if user entered something there

    console.log("Updating profile on both Firestore and Context");
    //Update Context
    authCtx.updateProfile(
      displayName.current.value,
      phonenumber.current.value,
      firstName.current.value,
      lastName.current.value
    );
    //Updating Firebase
    const docRef = doc(fbDb, "users", authCtx.userId);
    updateDoc(docRef, {
      displayName: displayName.current.value,
      phoneNumber: phonenumber.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
    }).then((res) => {});
    setProfileChanged(true);
  };

  const onCloseHandler = () => {
    navigate("/");
  };

  return (
    <div className="container mt-3">
      {(authCtx.displayName === "" ||
        authCtx.firstName === "" ||
        authCtx.lastName === "" ||
        authCtx.phoneNumber === "") && (
        <div className="alert alert-danger text-center">
          <strong>Please make sure to fill out all below details</strong>
        </div>
      )}
      {!authCtx.isLoggedIn ? (
        <div className="alert alert-danger text-center">
          <strong>
            You do not have enough permissions to render this page
          </strong>
        </div>
      ) : (
        <>
          <div className="text-center">
            <h3>My Details</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="displayname">Display Name</label>
              <input
                ref={displayName}
                defaultValue={authCtx.displayName}
                className="form-control"
                type="text"
                id="displayname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                ref={firstName}
                defaultValue={authCtx.firstName}
                className="form-control"
                type="text"
                id="firstname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                ref={lastName}
                defaultValue={authCtx.lastName}
                className="form-control"
                type="text"
                id="lastname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                ref={phonenumber}
                defaultValue={authCtx.phoneNumber}
                className="form-control"
                type="tel"
                id="phonenumber"
              />
            </div>

            <br />
            <div className="text-end">
              <Button className="m-1" type="submit" variant="primary">
                Submit Changes
              </Button>
            </div>
            <div className="text-center">
              {profileChanged && (
                <div className="alert alert-success">
                  <strong>Personal details modified</strong>
                </div>
              )}
            </div>
          </form>
          <div className="text-center">
            <h3>Password Change</h3>
          </div>
          <form onSubmit={onPasswordChange}>
            <div className="form-group">
              <label htmlFor="password">Current Password</label>
              <input
                ref={currentpassword}
                className="form-control"
                type="password"
                id="currentpassword"
              />
              {/* <div className="invalid-feedback">Password not strong enough</div> */}
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                ref={password1}
                className="form-control"
                type="password"
                id="password1"
              />
              {/* <div className="invalid-feedback">Password not strong enough</div> */}
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm New Password</label>
              <input
                ref={password2}
                className="form-control"
                type="password"
                id="password2"
              />
              <br />
            </div>
            <div className="text-end">
              {" "}
              <Button className="m-1" type="submit" variant="primary">
                Change Password
              </Button>
            </div>
            <div className="text-center">
              {passwordError !== "" && (
                <div className="alert alert-danger">
                  <strong>{passwordError}</strong>
                </div>
              )}
              {passwordchanged && (
                <div className="alert alert-success">
                  <strong>Password changed!</strong>
                </div>
              )}
            </div>
          </form>
          <div className="text-center">
            <Button
              className="m-1"
              variant="secondary"
              onClick={onCloseHandler}
            >
              Exit
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
