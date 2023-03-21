import ModalScreen from "../../UI/ModalScreen";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useRef, useContext, useEffect } from "react";
import ScheduleContext from "./Context/schedule-context";
import NewTimeOptionForm from "./NewTimeOptionForm";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore/lite";

const EditGame = (props) => {
  const params = useParams();
  //console.log(params.date);
  //console.log(props.firebaseConn);
  const date = useRef();

  const [numberOfOptions, setNumberOfOptions] = useState(0);
  const [gameIndex, setgameIndex] = useState(-1);
  const [options, setOptions] = useState([]);
  const [gameAdded, setgameAdded] = useState(false);
  const [dateTyped, setDateTyped] = useState(params.date);
  const [newOptions, setNewOptions] = useState([]);
  const [addGameBtnReady, setaddGameBtnReady] = useState(false);
  //   const [firstTimeConfirm, setfirstTimeConfirm] = useState(true);

  useEffect(() => {
    if (dateTyped.includes("-") && newOptions.length > 0) {
      setaddGameBtnReady(true);
    }
  }, [dateTyped, newOptions]);

  const scheduleCtx = useContext(ScheduleContext);

  useEffect(() => {
    //Get the correct game
    const gameIndex = scheduleCtx.games.findIndex(
      (game) => game.date === params.date
    );
    setgameIndex(gameIndex);
    setNumberOfOptions(scheduleCtx.games[gameIndex].options.length);
    setOptions(scheduleCtx.games[gameIndex].options);
  }, [params.date]);

  const navigate = useNavigate();

  const exitHandler = () => {
    navigate("/schedule");
  };

  const onTimeAdded = (timeFrom, timeTo, cost, id) => {
    setNewOptions((prevState) => [
      ...prevState,
      {
        timeFrom: timeFrom,
        timeTo: timeTo,
        cost: cost,
        id: id,
        date: date.current.value,
      },
    ]);
    // let newArray = [...options];
    // newArray.push({
    //   timeFrom: timeFrom,
    //   timeTo: timeTo,
    //   cost: cost,
    //   id: id,
    //   date: date.current.value,
    // });
    // console.log("NEW ARRAY AFTER ACCEPTING A TIME:", newArray);
    // setOptions(newArray);
  };

  console.log("New Options: ", newOptions);
  console.log("Options:", options);
  console.log("Number of Options:", numberOfOptions);
  console.log("Date Typed:", dateTyped);

  const fbdB = getFirestore(props.firebaseConn);

  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleCtx.removeGame(params.date);
    const newGame = {
      date: dateTyped,
      options: newOptions,
      //   options: options,
    };
    //console.log(newGame);
    scheduleCtx.addGame(newGame);
    const scheduleRef = doc(fbdB, "schedule", params.date);
    deleteDoc(scheduleRef).then((res) => {
      setDoc(doc(fbdB, "schedule", dateTyped), newGame, { merge: true }).then(
        (res) => {
          console.log(res);
        }
      );
    });

    setgameAdded(true);
    setTimeout(function () {
      exitHandler();
    }, 2000);
  };

  const onAddingOption = () => {
    setNumberOfOptions((prevState) => prevState + 1);
  };
  const onTimeRemoved = (id) => {
    let newArray = [...newOptions];
    // console.log("Option to remove:", newArray[id - 1]);
    newArray.splice(id, 1);
    console.log("NewArray After Removing:", newArray);
    setNumberOfOptions((prevState) => prevState - 1);
    setOptions(newArray);
  };

  let timeOptions = [];
  if (gameIndex !== -1) {
    if (numberOfOptions > 0) {
      console.log("Iterating over options");
      console.log("Options before iterating:", options);
      for (let i = 0; i < numberOfOptions; i++) {
        if (!!options[i]) {
          // if (!!scheduleCtx.games[gameIndex].options[i]) {
          console.log("Option " + i + ":", options[i]);
          timeOptions.push(
            <NewTimeOptionForm
              key={i}
              id={i}
              requester="editGame"
              timeFrom={options[i].timeFrom}
              timeTo={options[i].timeTo}
              cost={options[i].cost}
              onTimeAdded={onTimeAdded}
              onTimeRemoved={onTimeRemoved}
            />
          );
        } else {
          timeOptions.push(
            <NewTimeOptionForm
              key={i + 1}
              id={i + 1}
              requester="editGame"
              timeFrom=""
              timeTo=""
              cost=""
              onTimeAdded={onTimeAdded}
              onTimeRemoved={onTimeRemoved}
            />
          );
        }
      }
    }
  }

  const onAddingDate = () => {
    setDateTyped(date.current.value);
  };

  //   console.log(dateTyped);

  return (
    <ModalScreen title="Edit Game">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          {dateTyped.includes("-") ? (
            <input
              ref={date}
              defaultValue={params.date}
              className="form-control is-valid"
              type="date"
              id="date"
              onChange={onAddingDate}
            />
          ) : (
            <input
              ref={date}
              defaultValue={params.date}
              className="form-control"
              type="date"
              id="date"
              onChange={onAddingDate}
            />
          )}
        </div>
        <br />
        {timeOptions}
        <div className="alert alert-info text-center">
          <strong>
            Make sure to at least confirm on time option before proceeding,
            before then the option to accept changes will not be available
          </strong>
        </div>
        <Button
          className="m-1"
          type="button"
          variant="primary"
          onClick={onAddingOption}
        >
          Add a Time Option
        </Button>

        <Button className="m-1" variant="secondary" onClick={exitHandler}>
          Cancel
        </Button>

        {addGameBtnReady ? (
          <Button className="m-1" type="submit" variant="primary">
            Accept Changes
          </Button>
        ) : (
          <Button className="m-1 disabled" type="submit" variant="primary">
            Accept Changes
          </Button>
        )}

        {gameAdded && (
          <div className="alert alert-success">
            <strong>"Game has been modified successfully"</strong>
          </div>
        )}
      </form>
    </ModalScreen>
  );
};

export default EditGame;
