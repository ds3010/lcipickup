import ModalScreen from "../../UI/ModalScreen";
import { useParams } from "react-router-dom";
import NewGameForm from "./NewGameForm";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const EditGame = (props) => {
  const params = useParams();
  //console.log(params.date);
  //console.log(props.firebaseConn);

  const navigate = useNavigate();

  const exitHandler = () => {
    navigate("/schedule");
  };

  return (
    <ModalScreen title="Edit Game" btnText="">
      <p>Editing Game Coming Soon...</p>
      <Button className="btn-secondary" onClick={exitHandler}>
        Close
      </Button>
    </ModalScreen>
  );
};

export default EditGame;
