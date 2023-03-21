import ModalScreen from "../../UI/ModalScreen";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ScheduleContext from "./Context/schedule-context";
import { getFirestore, doc, deleteDoc } from "firebase/firestore/lite";

const DeleteGame = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const scheduleCtx = useContext(ScheduleContext);

  const [gameDeleted, setGameDeleted] = useState(false);

  const exitHandler = () => {
    navigate("/schedule");
  };
  const fbdB = getFirestore(props.firebaseConn);
  const onDeleteHandler = () => {
    scheduleCtx.removeGame(params.date);
    const scheduleRef = doc(fbdB, "schedule", params.date);
    deleteDoc(scheduleRef).then((res) => {
      setGameDeleted(true);
    });
    setTimeout(function () {
      exitHandler();
    }, 2000);
  };

  return (
    <ModalScreen title="Delete Game">
      <div className="alert alert-info">
        <strong>
          Are you sure you want to delete the game set for {params.date}
        </strong>
      </div>
      <Button
        className="m-1 btn-danger"
        type="button"
        variant="primary"
        onClick={onDeleteHandler}
      >
        Delete
      </Button>
      <Button className="m-1" variant="secondary" onClick={exitHandler}>
        Cancel
      </Button>
      {gameDeleted && (
        <div className="alert alert-success">
          <strong>Game for {params.date} has been deleted successfully</strong>
        </div>
      )}
    </ModalScreen>
  );
};

export default DeleteGame;
