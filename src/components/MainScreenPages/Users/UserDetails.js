import ModalScreen from "../../UI/ModalScreen";
import { useParams, useNavigate } from "react-router-dom";
import UsersContext from "./context/users-context";
import { useContext } from "react";
import { Button } from "react-bootstrap";

const UserDetails = (props) => {
  const params = useParams();
  const usersCtx = useContext(UsersContext);

  const navigate = useNavigate();

  const currentUser = usersCtx.users.filter((user) => {
    return user.email === params.userid;
  })[0];

  const onCloseHandler = () => {
    navigate("/users");
  };

  console.log(currentUser);
  return (
    <ModalScreen title="User Details">
      <div className="text-start">
        <ul className="list-group mb-5">
          <li className="list-group-item">
            <strong>Email:</strong> {currentUser.email}
          </li>
          <li className="list-group-item">
            <strong>First Name:</strong> {currentUser.firstName}
          </li>
          <li className="list-group-item">
            <strong>Last Name:</strong> {currentUser.lastName}
          </li>
          <li className="list-group-item">
            <strong>Phone Number:</strong> {currentUser.phoneNumber}
          </li>
        </ul>
        <div className="text-center">
          <Button className="btn-secondary" onClick={onCloseHandler}>
            Exit
          </Button>
        </div>
      </div>
    </ModalScreen>
  );
};

export default UserDetails;
