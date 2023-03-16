import { Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";

const NewGameForm = (props) => {
  const date = useRef();
  const timeFrom = useRef();
  const timeTo = useRef();
  const cost = useRef();

  const [newGameAdded, setNewGameAdded] = useState(false);

  const fbApp = props.firebaseApp;
  const fbdB = getFirestore(fbApp);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Game to be added to schedule");
    console.log(
      date.current.value,
      timeFrom.current.value,
      timeTo.current.value,
      cost.current.value
    );
    const usersRef = doc(fbdB, "schedule", date.current.value);
    setDoc(
      usersRef,
      {
        timeFrom: timeFrom.current.value,
        timeTo: timeTo.current.value,
        cost: cost.current.value,
      },
      { merge: true }
    );
    setNewGameAdded(true);
    setTimeout(function () {
      props.stopAdding();
    }, 2000);
  };

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
      <div className="row">
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
      </div>

      <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
        Cancel
      </Button>
      <Button className="m-1" type="submit" variant="primary">
        Add Game to Schedule
      </Button>
      {newGameAdded && (
        <div className="alert alert-success">
          <strong>"New Game has been added to Schedule"</strong>
        </div>
      )}
    </form>
  );
};

export default NewGameForm;
