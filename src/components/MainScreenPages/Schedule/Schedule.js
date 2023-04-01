import Game from "./Game";
import AuthContext from "../../Authentication/Context/auth-context";
import ScheduleContext from "./Context/schedule-context";
import { useContext, useState,  useEffect} from "react";
import { Button } from "react-bootstrap";
import NewGameForm from "./NewGameForm";
// import { useParams } from "react-router-dom";

const Schedule = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  const ScheduleCtx = useContext(ScheduleContext);
  const authCtx = useContext(AuthContext);
  const [reloadMessage, setReloadMessage] = useState(false)

  const onAddingGameHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

  useEffect(() =>{
    if(ScheduleCtx.games.length === 0) {
      console.log("Empty Games Detected")
      setReloadMessage(true)
    } else {
      setReloadMessage(false)
    }
  },[ScheduleCtx.games.length])


  //console.log("Schedule")
  //console.log(ScheduleCtx.games)

  // //Forcing a refreh
  // const [refreshed, setrefreshed] = useState(false)
  // if(!refreshed) {
  //   setrefreshed(true)
  // }

  return (
    <>
      <div className="container text-center">
        <h3>Schedule</h3>
        {authCtx.isAdmin && (
          <Button
            className="d-block btn-success col-12"
            onClick={onAddingGameHandler}
          >
            Add Game
          </Button>
        )}
        {reloadMessage &&<><br /><div className="alert alert-success text-center">
        <strong>Please reload your browser to update game schedule</strong>
      </div></>}
        <br />
        {isAdding && (
          <NewGameForm
            stopAdding={stopAddingHandler}
            firebaseApp={props.firebaseConn}
            date={""}
          ></NewGameForm>
        )}
      </div>
      <div id="accordion">
        {ScheduleCtx.games.length > 0 &&
          ScheduleCtx.games.map((game) => (
            <Game
              data={game}
              key={game.date}
              firebaseConn={props.firebaseConn}
            ></Game>
          ))}
      </div>
    </>
  );
};

export default Schedule;
