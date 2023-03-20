import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../../Authentication/Context/auth-context";
import { useNavigate } from "react-router-dom";

const Game = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  const authCtx = useContext(AuthContext);

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

  const navigate = useNavigate();

  const onEditingHandler = () => {
    navigate("/editgame/" + props.data.date);
  };

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

        <div className="d-flex">
          {authCtx.isLoggedIn && (
            <div>
              <Button className="m-1" onClick={onEditingHandler}>
                Edit
              </Button>
              <Button className="m-1 btn-danger">Delete</Button>
            </div>
          )}
          <div>
            {isActive ? (
              <h5
                role="button"
                className="align-top"
                onClick={expandOrCollapse}
              >
                -
              </h5>
            ) : (
              <h5
                role="button"
                className="align-top"
                onClick={expandOrCollapse}
              >
                +
              </h5>
            )}
          </div>
        </div>
      </div>

      {isActive && (
        <div id="collapse1" className="collapse show">
          <div className="card-body">
            {props.data.options.map((option) => (
              <div className="form-check" key={option.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={option.date}
                  id={option.date}
                  onChange={onOptionSelected}
                />
                <label className="form-check-label">
                  {/* {" "} */}
                  {option.timeFrom + " to " + option.timeTo}
                  <p className="d-inline text-monospace"> ({option.cost}CAD)</p>
                </label>
              </div>
            ))}
          </div>
          {!authCtx.isLoggedIn ? (
            <button className={btnClasses} type="button">
              Play!
            </button>
          ) : (
            <div className="alert alert-success text-center">
              <strong>"As an admin, you are already playing by default"</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
