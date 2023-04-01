import ModalScreen from "../../UI/ModalScreen";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import ScheduleContext from "./Context/schedule-context";
import { getGameIdForPayment } from "./PossibleGamesArray";

const PlayGame = (props) => {
  const params = useParams();
  const scheduleCtx = useContext(ScheduleContext);
  const navigate = useNavigate();

  const game = {
    ...scheduleCtx.games.filter((game) => game.date === params.date)[0],
  };

  const optionsCopy = [...game.options];
  // console.log(optionsCopy[params.gameId].cost);
  // console.log("TEST");
  // console.log(getGameIdForPayment(optionsCopy[params.gameId].cost));

  const closeHandler = () => {
    navigate("/schedule");
  };

  const onPaymentHandler = async () => {
    //props.onAccept(params.date, params.gameId);
    //STRIPE CLIENT HERE TODO:
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: getGameIdForPayment(optionsCopy[params.gameId].cost) }],
      }),
    }).then(res =>{
      return res.json();
    }).then((response) =>{
      if (response.url) {
        window.location.assign(response.url); //Forwarding user to stripe
      }
    });
  };

  return (
    <ModalScreen title="Play">
      <div className="alert alert-danger text-center">
        <strong>
          Do you want to confirm you are playing on {params.date} from{" "}
          {optionsCopy[params.gameId].timeFrom} to{" "}
          {optionsCopy[params.gameId].timeTo}
        </strong>
      </div>
      <Button onClick={closeHandler} className="m-1 btn-secondary">
        Cancel
      </Button>
      <Button onClick={onPaymentHandler} className="m-1">
        Go Pay!
      </Button>
    </ModalScreen>
  );
};

export default PlayGame;
