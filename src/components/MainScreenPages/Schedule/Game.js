import { useState } from "react";

const Game = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  //console.log(props.data.options)

  const expandOrCollapse = () => {
    setIsActive((prev) => {
      return !prev;
    });
  };

  const onOptionSelected = () => {
    //console.log('option selected')
    setBtnActive(true);
  };

  const btnClasses = btnActive
    ? "btn btn-secondary col-12"
    : "btn btn-secondary col-12 disabled";

  return (
    <div className="card container">
      <div className="d-flex justify-content-between card-header">
        <h5>
          <a
            href="#collapse1"
            data-parent="#accordion"
            data-toggle="collapse"
            className="align-top"
            onClick={expandOrCollapse}
          >
            {props.data.date}
          </a>
        </h5>
        {isActive ? (
          <h5 role="button" className="align-top" onClick={expandOrCollapse}>
            -
          </h5>
        ) : (
          <h5 role="button" className="align-top" onClick={expandOrCollapse}>
            +
          </h5>
        )}
      </div>

      {isActive && (
        <div id="collapse1" className="collapse show">
          <div className="card-body">
            {props.data.options.map((option) => (
              <div className="form-check" key={option.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={option.id}
                  id={option.id}
                  onChange={onOptionSelected}
                />
                <label className="form-check-label">
                  {/* {" "} */}
                  {option.timeFrom + " to " + option.timeTo}
                  <p className="d-inline text-monospace">({option.cost})</p>
                </label>
              </div>
            ))}
          </div>
          <button className={btnClasses} type="button">
            Play!
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
