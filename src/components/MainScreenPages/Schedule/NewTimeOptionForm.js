import { Button } from "react-bootstrap";
import { useState, useRef } from "react";

const NewTimeOptionForm = (props) => {
  const timeFrom = useRef();
  const timeTo = useRef();
  const cost = useRef();

  const [inputClass, setInputClass] = useState("");

  //   const onAddingOption = (e) => {
  //     e.preventDefault();
  //     console.log("TO DO: Adding option to new game form");
  //   };

  const onTyping = () => {
    // console.log(
    //   timeFrom.current.value,
    //   timeTo.current.value,
    //   cost.current.value
    // );
    if (
      !timeFrom.current.value ||
      !timeTo.current.value ||
      !cost.current.value
    ) {
      //onsole.log("some values are empty");
      setInputClass("is-invalid");
    } else {
      setInputClass("");
      props.onTimeAdded();
    }
  };
  return (
    <>
      {/* <form onSubmit={onAddingOption}> */}
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="time">Time From</label>
          <input
            ref={timeFrom}
            className={"form-control " + inputClass}
            type="time"
            id="time"
            onChange={onTyping}
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="time">Time To</label>
          <input
            ref={timeTo}
            className={"form-control " + inputClass}
            type="time"
            id="time"
            onChange={onTyping}
          />
        </div>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="cost">Cost per Player</label>
        <input
          ref={cost}
          className={"form-control " + inputClass}
          type="number"
          step="any"
          id="cost"
          onChange={onTyping}
        />
        <br />
      </div>
      <div className="text-end">
        {/* <Button type="button" className="m-1 btn-success disabled">
          Accept New Time
        </Button>
        <Button type="button" className="m-1 btn-danger">
          Remove Option
        </Button> */}
      </div>

      {/* </form> */}
    </>
  );
};

export default NewTimeOptionForm;
