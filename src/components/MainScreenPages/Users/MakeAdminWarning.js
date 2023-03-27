import ModalScreen from "../../UI/ModalScreen";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UsersContext from "./context/users-context";
import AuthContext from "../../Authentication/Context/auth-context";
import { useContext, useState } from "react";
import {
  doc,
  updateDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";

const MakeAdminWarning = (props) => {
  const params = useParams();
  const usersCtx = useContext(UsersContext);
  const authCtx = useContext(AuthContext);
  const [userDataObtained, setUserDataObtained] = useState("");
  const [adminSet, setAdminSet] = useState(false);

  const onMakingAdminHandler = () => {
    usersCtx.users.forEach((user) => {
      if (user.email === params.userid) {
        setUserDataObtained(user);
      }
    });
  };

  console.log("User Retrieved:", userDataObtained);

  if (userDataObtained !== "") {
    console.log("Now these are the users from Firebase");
    const fbDb = getFirestore(props.firebaseConn);
    const usersColRef = collection(fbDb, "users");
    if (usersColRef !== null) {
      getDocs(usersColRef).then((res) => {
        //usersCtx.clearUsers();
        let newConfig = [];
        // let key;
        res.docs.forEach((document) => {
          if (document.data().email === params.userid) {
            let newUserConfig = { ...document.data() };
            newUserConfig.isAdmin = true;
            //console.log(newUserConfig);
            const key =
              document._key.path.segments[
                document._key.path.segments.length - 1
              ];
            newConfig.push(newUserConfig);
            const documentRef = doc(fbDb, "users", key);
            updateDoc(documentRef, {
              isAdmin: true,
            })
              .then((res) => {
                //console.log("Firebase Changed");
                //console.log(res);
              })
              .catch((error) => {
                //console.log(error.message);
              });
          } else {
            newConfig.push(document.data());
          }
          //usersCtx.addUser(doc.data());
        });
        usersCtx.clearUsers();
        newConfig.forEach((config) => {
          usersCtx.addUser(config);
        });
        setUserDataObtained("");
        setAdminSet(true);
        setTimeout(() => {
          onCancelHandler();
        }, 2000);
      });
    }
  }

  //console.log(usersCtx.users);
  const navigate = useNavigate();
  const onCancelHandler = () => {
    navigate("/users");
  };
  return (
    <ModalScreen title="Add Admin Priviledges">
      {!authCtx.isAdmin ? (
        <div className="alert alert-danger text-center">
          <strong>You do not have permissions to access this page</strong>
        </div>
      ) : (
        <>
          <div className="alert alert-danger text-center">
            <strong>Are you sure you want to make this user an Admin?</strong>
          </div>
          <div className="text-center">
            <strong>{params.userid}</strong>
          </div>
          <br />
          <div className="text-center">
            <Button className="btn-secondary m-1" onClick={onCancelHandler}>
              Cancel
            </Button>
            <Button className="btn-success m-1" onClick={onMakingAdminHandler}>
              Confirm
            </Button>
          </div>
          <br />
          {adminSet && (
            <div className="alert alert-success text-center">
              <strong>You have successfully made this user an Admin</strong>
            </div>
          )}
        </>
      )}
    </ModalScreen>
  );
};

export default MakeAdminWarning;
