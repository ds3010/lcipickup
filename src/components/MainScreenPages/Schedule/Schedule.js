import Game from "./Game";
import AuthContext from "../../Authentication/Context/auth-context";
import ScheduleContext from "./Context/schedule-context";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import NewGameForm from "./NewGameForm";

const Schedule = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  const ScheduleCtx = useContext(ScheduleContext);
  const authCtx = useContext(AuthContext);

  const onAddingGameHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

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
            <Game data={game} key={game.date}></Game>
          ))}
      </div>
    </>
  );
};

export default Schedule;
