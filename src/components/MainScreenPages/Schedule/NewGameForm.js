import { Button } from "react-bootstrap";
import { useRef, useState, useEffect, useContext } from "react";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import NewTimeOptionForm from "./NewTimeOptionForm";
import ScheduleContext from "./Context/schedule-context";
import checkSquare from "../../../assets/icons/check-square.svg";

const NewGameForm = (props) => {
  const date = useRef();
  //console.log(props.date, props.firebaseApp);

  const [numberOfTimeOptions, setNumberOfTimeOptions] = useState(1);
  const [addGameBtnReady, setaddGameBtnReady] = useState(false);
  const [options, setOptions] = useState([]);
  const [dateTyped, setDateTyped] = useState(props.date);
  const [newGameAdded, setNewGameAdded] = useState(false);
  const [gameAlreadyExists, setGameAlreadyExists] = useState(false);

  const ScheduleCtx = useContext(ScheduleContext);

  //The following code keeps track of the date typed in order to set the date state
  const onAddingDate = () => {
    setDateTyped(date.current.value);
  };
  //The following function is called by the NewTimeOptionForm.js component whenever a time option has been added and updates the "options" state array
  const onTimeAdded = (timeFrom, timeTo, cost, maxPlayers, format, id) => {
    let newArray = [...options];
    newArray.push({
      timeFrom: timeFrom,
      timeTo: timeTo,
      cost: cost,
      id: id,
      maxPlayers,
      signedUpUsers: [],
      format,
      date: dateTyped,
      //date: "Sunday, March 26th, 2023",
    });
    setOptions(newArray);
  };

  //The following function is called by the NewTimeOptionForm.js component whenever a time option has been removed and deletes the correct option from the "options" state array
  const onTimeRemoved = (id) => {
    let newArray = [...options];
    //console.log("Option to remove:", newArray[id - 1]);
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
    let maxPlayers = "";
    if (!!options[i]) {
      timeFrom = options[i].timeFrom;
      timeTo = options[i].timeTo;
      cost = options[i].cost;
      maxPlayers = options[i].maxPlayers;
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
        maxPlayers={maxPlayers}
        signedUpUsers={[]}
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

  //There are three scenarios for when the administrator is submitting a new game.
  //1. A game has not yet been creating for this date, which means we just need to add a new date
  //2. The administrator is just editing the time options but keeping the game date
  //3. The administrator is attempting to either change the date of an existing game or add a new game, but there is already a game configured for this date
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting");
    console.log(ScheduleCtx.games);
    //This is the game we will need to submit
    const gameContent = {
      date: dateTyped,
      options: options,
    };
    console.log(gameContent);
    //Below we are investigating if the game already exists
    let dateAlreadyExisting = [];
    if (!!ScheduleCtx.games) {
      dateAlreadyExisting = ScheduleCtx.games.filter(
        (game) => game.date === dateTyped
      );
    }
    console.log(dateAlreadyExisting);
    // This is for scenario 2, props.date was provided which means the order comes from EditGame component and the date has been kept the same
    if (props.date !== "" && props.date === dateTyped) {
      //Then we are modifying a game from EditGame.js component within the same date. We will delete that date from ScheduleCtx and Firebase and then add the new game to both
      console.log("Editing the game within the same date");
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
      setTimeout(function () {
        props.stopAdding();
      }, 2000);
      //This is for scenario 3, the administrator is either modifying an existing game with a new date which happens to be busy or attempting to add a new game
      //from scratch but the date is also busy
    } else if (!!dateAlreadyExisting && dateAlreadyExisting.length > 0) {
      console.log("Date Already existing");
      if (dateAlreadyExisting.length > 0) {
        //We are attempting to add a game on a date that already exists
        //We enable the following state, which prompts an alert to let the administrator know that an existing game is about to be replaced, if administrator accepts
        //the onReplacingGameHandler function is called
        setGameAlreadyExists(true);
      }
      //And this is for scenario 1, the administrator is adding a new game from scratch and there are no date conflicts
    } else {
      console.log("NEW GAME");
      const scheduleRef = doc(fbdB, "schedule", dateTyped);
      setDoc(scheduleRef, gameContent, { merge: true });
      ScheduleCtx.addGame(gameContent);
      setNewGameAdded(true);
      setTimeout(function () {
        props.stopAdding();
      }, 2000);
    }
  };

  //The following function is called after the administrator accepts to replace the exiting conflicts with a new date
  const onReplacingGameHandler = () => {
    const gameContent = {
      date: dateTyped,
      options: options,
    };
    ScheduleCtx.removeGame(dateTyped);
    ScheduleCtx.addGame(gameContent);
    const scheduleRef = doc(fbdB, "schedule", dateTyped);
    deleteDoc(scheduleRef).then((res) => {
      setDoc(scheduleRef, gameContent, {
        merge: true,
      }).then((res) => {
        console.log(res);
      });
    });
    setNewGameAdded(true);
    setGameAlreadyExists(false);
    setTimeout(function () {
      props.stopAdding();
    }, 2000);
  };
  //Code to close the game option to stop adding
  const onCloseHandler = () => {
    props.stopAdding();
  };

  //JSX
  return (
    <>
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
              className="form-control is-invalid"
              type="date"
              id="date"
              onChange={onAddingDate}
            />
          )}
        </div>
        <br />
        <hr className="border border-1 border-dark"></hr>

        {timeOptions}
        {(!dateTyped.includes("-") || options.length === 0) && (
          <div className="alert alert-warning text-center">
            <strong>Note:</strong> Make sure to fill out at least one game
            details form and to enter a valid date. Then confirm the game
            details with the green check mark button (
            <img src={checkSquare} className="bg-success"></img>) in order to be
            able to save the game in the database. You may add more games with
            the "add More Games for this Date" button before saving the date
          </div>
        )}
        <div>
          <Button
            className="m-1"
            type="button"
            variant="warning"
            onClick={onAddingOption}
          >
            Add More Games for this Date
          </Button>
        </div>

        <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
          Cancel
        </Button>
        {addGameBtnReady && !gameAlreadyExists ? (
          <Button className="m-1" type="submit" variant="success">
            Save Date
          </Button>
        ) : (
          <Button className="m-1 disabled" type="submit" variant="secondary">
            Save Date
          </Button>
        )}
        {gameAlreadyExists && (
          <div className="alert alert-danger">
            <strong>
              A game for {dateTyped} already exists, would you like to replace
              it?
            </strong>
            <div>
              {" "}
              <Button
                className="m-1"
                variant="secondary"
                onClick={onCloseHandler}
              >
                No
              </Button>
              <Button
                className="m-1"
                variant="primary"
                onClick={onReplacingGameHandler}
              >
                Yes
              </Button>
            </div>
          </div>
        )}
        {newGameAdded && (
          <div className="alert alert-success">
            <strong>New Game has been added to Schedule</strong>
          </div>
        )}
      </form>
      <div className="m-0 p-0">
        <hr className="border border-3 border-dark"></hr>
      </div>
    </>
  );
};

export default NewGameForm;
