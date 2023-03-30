import ModalScreen from "../../UI/ModalScreen";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ScheduleContext from "./Context/schedule-context";
import AuthContext from "../../Authentication/Context/auth-context";
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";

const PlayGame = (props) => {
  const params = useParams();
  const scheduleCtx = useContext(ScheduleContext);
  const authCtx = useContext(AuthContext);
  const fbdB = getFirestore(props.FirebaseConn);

  const navigate = useNavigate();

  const [userIsPlaying, setUserIsPlaying] = useState(false);
  //Filter and Extract game based on params.date
  const game = {
    ...scheduleCtx.games.filter((game) => game.date === params.date)[0],
  };

  const optionsCopy = [...game.options];
  //Add the email if it is not already included

  const closeHandler = () => {
    navigate("/schedule");
  };
  const addUserToGame = () => {
    if (
      !optionsCopy[parseInt(params.gameId)].signedUpUsers.includes(
        authCtx.email
      )
    ) {
      optionsCopy[parseInt(params.gameId)].signedUpUsers.push(authCtx.email);
      const newGame = {
        date: params.date,
        options: optionsCopy,
      };
      //Delete old game and add new one in Context
      scheduleCtx.removeGame(params.date);
      scheduleCtx.addGame(newGame);
      //Delete old game and add new one in Firebase
      const scheduleRef = doc(fbdB, "schedule", params.date);
      deleteDoc(scheduleRef).then((res) => {
        setDoc(doc(fbdB, "schedule", params.date), newGame, {
          merge: true,
        }).then((res) => {
          setUserIsPlaying(true);
          setTimeout(() => {
            closeHandler();
          }, 2000);
        });
      });
    }
  };
  return (
    <ModalScreen title="Play">
      <div className="alert alert-danger text-center">
        <strong>
          Do you want to confirm you are playing on {params.date} from
          {optionsCopy[params.gameId].timeFrom} to
          {optionsCopy[params.gameId].timeTo}
        </strong>
      </div>
      <Button onClick={closeHandler} className="m-1 btn-secondary">
        Cancel
      </Button>
      <Button onClick={addUserToGame} className="m-1">
        Play
      </Button>
      <br />
      {userIsPlaying && (
        <div className="alert alert-success text-center">
          <strong>You have have been successfully added to this game</strong>
        </div>
      )}
    </ModalScreen>
  );
};

export default PlayGame;
