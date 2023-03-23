import { Button } from "react-bootstrap";
import { useRef, useState, useEffect, useContext } from "react";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import NewTimeOptionForm from "./NewTimeOptionForm";
import ScheduleContext from "./Context/schedule-context";

const NewGameForm = (props) => {
  const date = useRef();
  console.log(props.date, props.firebaseApp);

  const [numberOfTimeOptions, setNumberOfTimeOptions] = useState(1);
  const [addGameBtnReady, setaddGameBtnReady] = useState(false);
  const [options, setOptions] = useState([]);
  const [dateTyped, setDateTyped] = useState(props.date);
  const [newGameAdded, setNewGameAdded] = useState(false);

  const ScheduleCtx = useContext(ScheduleContext);

  //The following code keeps track of the date typed in order to set the date state
  const onAddingDate = () => {
    setDateTyped(date.current.value);
  };
  //The following function is called by the NewTimeOptionForm.js component whenever a time option has been added and updates the "options" state array
  const onTimeAdded = (timeFrom, timeTo, cost, id) => {
    let newArray = [...options];
    newArray.push({
      timeFrom: timeFrom,
      timeTo: timeTo,
      cost: cost,
      id: id,
      date: dateTyped,
      //date: "Sunday, March 26th, 2023",
    });
    setOptions(newArray);
  };

  //The following function is called by the NewTimeOptionForm.js component whenever a time option has been removed and deletes the correct option from the "options" state array
  const onTimeRemoved = (id) => {
    let newArray = [...options];
    console.log("Option to remove:", newArray[id - 1]);
    newArray.splice(id - 1, 1);
    setNumberOfTimeOptions((prevState) => prevState - 1);
    setOptions(newArray);
  };

  //The following function tracks everytime the date typed or the options array have changed and in case both are valid, the button to submit the game is enabled
  useEffect(() => {
    if (dateTyped.includes("-") && options.length > 0) {
      setaddGameBtnReady(true);
    }
  }, [dateTyped, options]);

  //Whenever the user decides to add an extra time option, we increase the number of time options by one
  const onAddingOption = () => {
    setNumberOfTimeOptions((prevState) => prevState + 1);
  };

  //The following code renders as many time option-forms as the administrator has decided to add
  //Remember that this code is rendered at every refresh, so if an option is removed, we have to make sure we pass the right props to each time option
  //so that the component is rendered unchanged (better UX)
  let timeOptions = [];
  for (let i = 0; i < numberOfTimeOptions; i++) {
    let timeFrom = "";
    let timeTo = "";
    let cost = "";
    if (!!options[i]) {
      timeFrom = options[i].timeFrom;
      timeTo = options[i].timeTo;
      cost = options[i].cost;
      // console.log(timeFrom);
      // console.log(timeTo);
      // console.log(cost);
    }
    timeOptions.push(
      <NewTimeOptionForm
        key={i + 1}
        id={i + 1}
        timeFrom={timeFrom}
        timeTo={timeTo}
        requester="newGame"
        cost={cost}
        onTimeAdded={onTimeAdded}
        onTimeRemoved={onTimeRemoved}
      />
    );
  }

  //Next code uploads the game to firebase, updates the Schedule context and enables the alert that lets the user know the game was added successfully
  const fbApp = props.firebaseApp;
  const fbdB = getFirestore(fbApp);

  const handleSubmit = (e) => {
    e.preventDefault();

    const gameContent = {
      date: dateTyped,
      options: options,
    };

    if (props.date !== "") {
      //Then we are modifying a game from EditGame.js component. We will delete that date from ScheduleCtx and Firebase and then add the new game to both
      ScheduleCtx.removeGame(props.date);
      ScheduleCtx.addGame(gameContent);
      const scheduleRef = doc(fbdB, "schedule", props.date);
      deleteDoc(scheduleRef).then((res) => {
        setDoc(doc(fbdB, "schedule", dateTyped), gameContent, {
          merge: true,
        }).then((res) => {
          console.log(res);
        });
      });
    } else {
      const scheduleRef = doc(fbdB, "schedule", dateTyped);
      setDoc(scheduleRef, gameContent, { merge: true });
      ScheduleCtx.addGame(gameContent);
      setNewGameAdded(true);
    }

    setTimeout(function () {
      props.stopAdding();
    }, 2000);
  };

  //Code to close the game option to stop adding
  const onCloseHandler = () => {
    props.stopAdding();
  };
  //console.log(dateTyped);
  //JSX
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        {dateTyped.includes("-") ? (
          <input
            ref={date}
            defaultValue={props.date}
            className="form-control is-valid"
            type="date"
            id="date"
            onChange={onAddingDate}
          />
        ) : (
          <input
            ref={date}
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
          Make sure to at least confirm one time option before proceeding or the
          option to save will not be available
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

      <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
        Cancel
      </Button>
      {addGameBtnReady ? (
        <Button className="m-1" type="submit" variant="primary">
          Save Game
        </Button>
      ) : (
        <Button className="m-1 disabled" type="submit" variant="primary">
          Save Game
        </Button>
      )}
      {newGameAdded && (
        <div className="alert alert-success">
          <strong>"New Game has been added to Schedule"</strong>
        </div>
      )}
    </form>
  );
};

export default NewGameForm;
