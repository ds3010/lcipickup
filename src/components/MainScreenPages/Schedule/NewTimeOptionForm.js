import { Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useRef } from "react";
import "./NewTimeOptionForm.css";

const NewTimeOptionForm = (props) => {
  //Setting references for inputs to keep track of them
  const timeFrom = useRef();
  const timeTo = useRef();
  // const cost = useRef();
  const maxPlayers = useRef();

  

  //After removing a time option, if other options were configured and have already been applied, we will receive these values as props
  //from NewGameForm.js and we should automatically set those values so the admin doesn't need to add them again
  if (
    props.timeFrom !== "" &&
    props.timeTo !== "" &&
    // props.cost !== "" &&
    props.maxPlayers !== ""
  ) {
    if (props.requester === "newGame") {
      timeFrom.current.value = props.timeFrom;
      timeTo.current.value = props.timeTo;
      // cost.current.value = props.cost;
      maxPlayers.current.value = props.maxPlayers;
    } else if (
      !!timeFrom.current &&
      !!timeTo.current &&
      // !!cost.current &&
      !!maxPlayers.current
    ) {
      timeFrom.current.value = props.timeFrom;
      timeTo.current.value = props.timeTo;
      // cost.current.value = props.cost;
      maxPlayers.current.value = props.maxPlayers;
    }
  }

  // console.log(props.timeFrom);
  // console.log(props.timeTo);
  // console.log(props.cost);

  //Track state if the time option was added properly
  const [timeAccepted, setTimeAccepted] = useState(false);
  const [inputClass, setInputClass] = useState("");
  const [format, setFormat] = useState("7vs7");
  const [cost, setCost] = useState("15$");

  const onAccept = () => {
    // Only accept option time if all three values have been added properly
    //in that case set the inputs as "is-valid" to show the user the changes were applied properly
    //Otherwise we won't accept the new time option and the inputs should be invalid

    if (
      !!timeFrom.current.value &&
      !!timeTo.current.value &&
      // !!cost.current.value &&
      !!maxPlayers.current.value
    ) {
      setTimeAccepted(true);
      setInputClass("is-valid");
      props.onTimeAdded(
        timeFrom.current.value,
        timeTo.current.value,
        cost,
        maxPlayers.current.value,
        format,
        props.id
      );
    } else {
      setTimeAccepted(false);
      setInputClass("is-invalid");
    }
  };

  const onFormatSelected = (e) => {
    //console.log(e.target.value);
    setFormat(e.target.value);
  };

  //If user chooses to remove a time option, upload the id of this element to NewGameForm.js to delete the proper time option
  const onRemove = () => {
    props.onTimeRemoved(props.id);
  };

  const onHandleSelect = (e) => {
    console.log(e);
    setCost(e);
  };
  return (
    <>
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="time">Time From</label>
          <input
            ref={timeFrom}
            defaultValue={props.timeFrom}
            className={"form-control " + inputClass}
            type="time"
            id="time"
            readOnly={timeAccepted}
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="time">Time To</label>
          <input
            ref={timeTo}
            defaultValue={props.timeTo}
            className={"form-control " + inputClass}
            type="time"
            id="time"
            readOnly={timeAccepted}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="time">Cost</label>
          <DropdownButton title={cost} id="cost" onSelect={onHandleSelect}>
            <Dropdown.Item eventKey="15$">15$</Dropdown.Item>
            <Dropdown.Item eventKey="18$">18$</Dropdown.Item>
          </DropdownButton>
          <br />
        </div>
        <div className="form-group col-6">
          <label htmlFor="time">Max Number of Players</label>
          <input
            ref={maxPlayers}
            //defaultValue={props.timeTo}
            className={"form-control " + inputClass}
            type="number"
            id="maxPlayers"
            readOnly={timeAccepted}
          />
        </div>
      </div>

      <div className="row">
        <label htmlFor="time">Format</label>

        <div className="col-4">
          <div className="form-check d-flex justify-content-center">
            <input
              className="form-check-input me-1"
              type="radio"
              name={"format" + props.id}
              id={"format" + props.id}
              defaultChecked={true}
              value="7vs7"
              onChange={onFormatSelected}
            />
            <label className="form-check-label">7vs7</label>
          </div>
          <div className="form-check d-flex justify-content-center">
            <input
              className="form-check-input me-1"
              type="radio"
              name={"format" + props.id}
              id={"format" + props.id}
              value="8vs8"
              onChange={onFormatSelected}
            />
            <label className="form-check-label">8vs8</label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-check d-flex justify-content-center">
            <input
              className="form-check-input me-1"
              type="radio"
              name={"format" + props.id}
              id={"format" + props.id}
              value="9vs9"
              onChange={onFormatSelected}
            />
            <label className="form-check-label">9vs9</label>
          </div>
          <div className="form-check d-flex justify-content-center">
            <input
              className="form-check-input me-1"
              type="radio"
              name={"format" + props.id}
              id={"format" + props.id}
              value="10vs10"
              onChange={onFormatSelected}
            />
            <label className="form-check-label">10vs10</label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-check d-flex justify-content-center">
            <input
              className="form-check-input me-1"
              type="radio"
              name={"format" + props.id}
              id={"format" + props.id}
              value="11vs11"
              onChange={onFormatSelected}
            />
            <label className="form-check-label">11vs11</label>
          </div>
        </div>
      </div>
      <div className="text-end">
        {/* Disabling the button if the time has already been accepted */}
        {!timeAccepted ? (
          <Button type="button" className="m-1 btn-success" onClick={onAccept}>
            Confirm Time
          </Button>
        ) : (
          <Button
            type="button"
            className="m-1 btn-success disabled"
            onClick={onAccept}
          >
            Confirm Time
          </Button>
        )}
        <Button type="button" className="m-1 btn-danger" onClick={onRemove}>
          Remove
        </Button>
        {!timeAccepted && inputClass === "is-invalid" && (
          <div className="alert alert-danger text-center">
            <strong>Please complete the above form</strong>
          </div>
        )}
      </div>

      {/* </form> */}
    </>
  );
};

export default NewTimeOptionForm;
