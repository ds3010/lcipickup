import { Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import NewTimeOptionForm from "./NewTimeOptionForm";

const NewGameForm = (props) => {
  const date = useRef();
  // const timeFrom = useRef();
  // const timeTo = useRef();
  // const cost = useRef();

  const [numberOfTimeOptions, setNumberOfTimeOptions] = useState(1);
  const [timeOptionComplete, settimeOptionComplete] = useState(false);
  const [addGameBtnReady, setaddGameBtnReady] = useState(false);

  let timeOptions = [];
  // const [newGameAdded, setNewGameAdded] = useState(false);

  const fbApp = props.firebaseApp;
  // const fbdB = getFirestore(fbApp);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("TO DO: Submit game to firebase and context");
    // const usersRef = doc(fbdB, "schedule", date.current.value);
    // setDoc(
    //   usersRef,
    //   {
    //     // date: date.current.value,
    //     // timeFrom: timeFrom.current.value,
    //     // timeTo: timeTo.current.value,
    //     // cost: cost.current.value,
    //     date: date.current.value,
    //     id: 1,
    //     options: [
    //       {
    //         time: "5pm to 6pm",
    //         price: cost.current.value,
    //         id: 0,
    //         date: date.current.value,
    //       },
    //     ],
    //   },
    //   { merge: true }
    // );
    // setNewGameAdded(true);
    // setTimeout(function () {
    //   props.stopAdding();
    // }, 2000);
  };

  const onAddingOption = () => {
    setNumberOfTimeOptions((prevState) => prevState + 1);
    settimeOptionComplete(false);
    setaddGameBtnReady(false);
  };
  //console.log(numberOfTimeOptions);

  const onTimeAdded = () => {
    settimeOptionComplete(true);
    setaddGameBtnReady(true);
  };

  for (var i = 0; i < numberOfTimeOptions; i++) {
    timeOptions.push(<NewTimeOptionForm key={i} onTimeAdded={onTimeAdded} />);
  }
  const onCloseHandler = () => {
    props.stopAdding();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input ref={date} className="form-control" type="date" id="date" />
      </div>
      <br />

      {timeOptions}
      {/* <div className="row">
        <div className="form-group col-6">
          <label htmlFor="time">Time From</label>
          <input
            ref={timeFrom}
            className="form-control"
            type="time"
            id="time"
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="time">Time To</label>
          <input ref={timeTo} className="form-control" type="time" id="time" />
        </div>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="cost">Cost per Player</label>
        <input
          ref={cost}
          className="form-control"
          type="number"
          step="any"
          id="cost"
        />
        <br />
      </div> */}

      {timeOptionComplete ? (
        <Button
          className="m-1"
          type="button"
          variant="primary"
          onClick={onAddingOption}
        >
          Add More Time Options
        </Button>
      ) : (
        <Button
          className="m-1 disabled"
          type="button"
          variant="primary"
          onClick={onAddingOption}
        >
          Add More Time Options
        </Button>
      )}

      <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
        Cancel
      </Button>
      {addGameBtnReady ? (
        <Button className="m-1" type="submit" variant="primary">
          Add Game to Schedule
        </Button>
      ) : (
        <Button className="m-1 disabled" type="submit" variant="primary">
          Add Game to Schedule
        </Button>
      )}
      {/* {newGameAdded && (
        <div className="alert alert-success">
          <strong>"New Game has been added to Schedule"</strong>
        </div>
      )} */}
    </form>
  );
};

export default NewGameForm;
