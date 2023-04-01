import ModalScreen from "../../UI/ModalScreen";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ScheduleContext from "../Schedule/Context/schedule-context";
import AuthContext from "../../Authentication/Context/auth-context";
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";

const Success = (props) => {
  const scheduleCtx = useContext(ScheduleContext);
  //   const authCtx = useContext(AuthContext);
  //   const fbdB = getFirestore(props.FirebaseConn);

  const navigate = useNavigate();
  console.log(scheduleCtx);

  //   const game = {
  //     ...scheduleCtx.games.filter((game) => game.date === props.date)[0],
  //   };

  //   const optionsCopy = [...game.options];

  //   if (
  //     !optionsCopy[parseInt(props.gameId)].signedUpUsers.includes(authCtx.email)
  //   ) {
  //     optionsCopy[parseInt(props.gameId)].signedUpUsers.push(authCtx.email);
  //     const newGame = {
  //       date: props.date,
  //       options: optionsCopy,
  //     };
  //     //Delete old game and add new one in Context
  //     scheduleCtx.removeGame(props.date);
  //     scheduleCtx.addGame(newGame);
  //     //Delete old game and add new one in Firebase
  //     const scheduleRef = doc(fbdB, "schedule", props.date);
  //     deleteDoc(scheduleRef).then((res) => {
  //       setDoc(doc(fbdB, "schedule", props.date), newGame, {
  //         merge: true,
  //       }).then((res) => {

  //       });
  //     });
  //   }

  const closeHandler = () => {
    navigate("/schedule");
  };

  //console.log("Schedule Context in Success.js:", scheduleCtx.games);

  return (
    <ModalScreen title="Payment Successful!">
      <br />

      <div className="alert alert-success text-center">
        <strong>You have have been successfully added to this game</strong>
      </div>

      <br />
      <Button onClick={closeHandler} className="m-1 btn-secondary">
        Exit
      </Button>
    </ModalScreen>
  );
};

export default Success;
