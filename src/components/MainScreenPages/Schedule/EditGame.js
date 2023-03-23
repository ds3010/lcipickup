import { useParams, useNavigate } from "react-router-dom";
import ModalScreen from "../../UI/ModalScreen";
import NewGameForm from "./NewGameForm";
import { useState, useContext, useEffect } from "react";
import ScheduleContext from "./Context/schedule-context";

const EditGame = (props) => {
  const params = useParams();
  //console.log(props.firebaseConn);
  //const [gameIndex, setgameIndex] = useState(-1);
  const [gameOptions, setGameOptions] = useState([]);

  const scheduleCtx = useContext(ScheduleContext);

  useEffect(() => {
    const gameIndex = scheduleCtx.games.findIndex(
      (game) => game.date === params.date
    );
    setGameOptions(scheduleCtx.games[gameIndex].options);
  }, [params.date]);

  const navigate = useNavigate();
  const stopAddingHandler = () => {
    navigate("/schedule");
  };

  // useState(scheduleCtx.games[])
  const currentOptions = gameOptions.map((opt) => {
    return (
      <div className="text-start" key={opt.id}>
        <li>
          {opt.timeFrom} to {opt.timeTo} at {opt.cost} CAD
        </li>
      </div>
    );
  });
  //console.log(currentOptions);

  //console.log(gameOptions);
  return (
    <ModalScreen title="Edit Game">
      <div className="alert alert-secondary">
        <strong>
          The following time options are already configured for this date, click
          on cancel or configure new times below. If you want to keep these
          times, please re-add them again here
        </strong>
        <br />
        <br />
        {currentOptions}
      </div>
      <NewGameForm
        date={params.date}
        stopAdding={stopAddingHandler}
        firebaseApp={props.firebaseConn}
      ></NewGameForm>
    </ModalScreen>
  );
};

export default EditGame;
