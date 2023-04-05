import ModalScreen from "../../UI/ModalScreen";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ScheduleContext from "../Schedule/Context/schedule-context";
import AuthContext from "../../Authentication/Context/auth-context";
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";

const Success = (props) => {
  const scheduleCtx = useContext(ScheduleContext);
  const authCtx = useContext(AuthContext);
  const fbdB = getFirestore(props.FirebaseConn);

  //const [date,setdate] = useState("")
  //const [gameId, setgameId] = useState("")

  const navigate = useNavigate();
  console.log(scheduleCtx.games);

  // useEffect(()=>{
  console.log(
    "authCtxGameToPlay: " +
      authCtx.gameToPlay.date +
      " " +
      authCtx.gameToPlay.gameId
  );
  if (scheduleCtx.games.length > 0) {
    const game = {
      ...scheduleCtx.games.filter(
        (game) => game.date === authCtx.gameToPlay.date
      )[0],
    };
    if (Object.keys(game).length > 0) {
      //console.log("Here");
      const optionsCopy = [...game.options];
      console.log(optionsCopy);
      if (
        !optionsCopy[
          parseInt(authCtx.gameToPlay.gameId)
        ].signedUpUsers.includes(authCtx.email)
      ) {
        optionsCopy[parseInt(authCtx.gameToPlay.gameId)].signedUpUsers.push(
          authCtx.email
        );
        const newGame = {
          date: authCtx.gameToPlay.date,
          options: optionsCopy,
        };
        //Delete old game and add new one in Context
        scheduleCtx.removeGame(authCtx.gameToPlay.date);
        scheduleCtx.addGame(newGame);
        //Delete old game and add new one in Firebase
        const scheduleRef = doc(fbdB, "schedule", authCtx.gameToPlay.date);
        deleteDoc(scheduleRef).then((res) => {
          setDoc(doc(fbdB, "schedule", authCtx.gameToPlay.date), newGame, {
            merge: true,
          }).then((res) => {
            console.log(res);
          });
        });
      }
    }
  }

  // },[authCtx.gameToPlay.gameId, authCtx.gameToPlay.date])

  // useEffect(() => {
  //   console.log("Reloading")
  //   //window.location.reload()
  // },[])

  const closeHandler = () => {
    navigate("/schedule");
  };

  //console.log("Schedule Context in Success.js:", scheduleCtx.games);

  return (
    <ModalScreen title="Payment Successful!">
      <br />

      <div className="alert alert-success text-center">
        <strong>You have have been successfully added to this game.</strong>
        <p>
          <strong>
            After exiting this message, please refresh the "Schedule" page as it
            might not be updated with the latest transaction
          </strong>
        </p>
      </div>

      <br />
      <Button onClick={closeHandler} className="m-1 btn-secondary">
        Exit
      </Button>
    </ModalScreen>
  );
};

export default Success;
