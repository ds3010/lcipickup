import { Button } from "react-bootstrap";
import { useState, useRef } from "react";

const NewTimeOptionForm = (props) => {
  //Setting references for inputs to keep track of them
  const timeFrom = useRef();
  const timeTo = useRef();
  const cost = useRef();

  //After removing a time option, if other options were configured and have already been applied, we will receive these values as props
  //from NewGameForm.js and we should automatically set those values so the admin doesn't need to add them again
  if (props.timeFrom !== "" && props.timeTo !== "" && props.cost !== "") {
    if (props.requester === "newGame") {
      timeFrom.current.value = props.timeFrom;
      timeTo.current.value = props.timeTo;
      cost.current.value = props.cost;
    } else if (!!timeFrom.current && !!timeTo.current && !!cost.current) {
      timeFrom.current.value = props.timeFrom;
      timeTo.current.value = props.timeTo;
      cost.current.value = props.cost;
    }
  }

  // console.log(props.timeFrom);
  // console.log(props.timeTo);
  // console.log(props.cost);

  //Track state if the time option was added properly
  const [timeAccepted, setTimeAccepted] = useState(false);
  const [inputClass, setInputClass] = useState("");

  const onAccept = () => {
    // Only accept option time if all three values have been added properly
    //in that case set the inputs as "is-valid" to show the user the changes were applied properly
    //Otherwise we won't accept the new time option and the inputs should be invalid
    console.log("ON ACCEPTING TIME");
    if (
      !!timeFrom.current.value &&
      !!timeTo.current.value &&
      !!cost.current.value
    ) {
      setTimeAccepted(true);
      setInputClass("is-valid");
      console.log("Time ACCEPTED!!!");
      props.onTimeAdded(
        timeFrom.current.value,
        timeTo.current.value,
        cost.current.value,
        props.id
      );
    } else {
      console.log("Time was NOT accepted");
      setTimeAccepted(false);
      setInputClass("is-invalid");
    }
  };

  console.log(inputClass);

  //If user chooses to remove a time option, upload the id of this element to NewGameForm.js to delete the proper time option
  const onRemove = () => {
    props.onTimeRemoved(props.id);
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
      <div className="form-group">
        <label htmlFor="cost">Cost per Player</label>
        <input
          ref={cost}
          defaultValue={props.cost}
          className={"form-control " + inputClass}
          type="number"
          step="any"
          id="cost"
          readOnly={timeAccepted}
        />
        <br />
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
