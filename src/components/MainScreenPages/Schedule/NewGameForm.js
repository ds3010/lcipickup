import { Button } from "react-bootstrap";
import { useRef } from "react";

const NewGameForm = (props) => {
  const date = useRef();
  const timeFrom = useRef();
  const timeTo = useRef();
  const cost = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Game to be added to schedule");
    console.log(
      date.current.value,
      timeFrom.current.value,
      timeTo.current.value,
      cost.current.value
      //TODO: Submit new game properly to firebase
    );
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
    </form>
  );
};

export default NewGameForm;
