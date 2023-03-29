import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../../Authentication/Context/auth-context";
import ScheduleContext from "./Context/schedule-context";
import { useNavigate } from "react-router-dom";
import trashSVG from "../../../assets/icons/trash.svg";
import editSVG from "../../../assets/icons/edit.svg";
import collapse from "../../../assets/icons/arrows-collapse.svg";
import expand from "../../../assets/icons/arrows-expand.svg";
import { getFirestore, deleteDoc, doc, setDoc } from "firebase/firestore";
import checkCircle from "../../../assets/icons/check-circle.svg";
//import "./Game.css";

const Game = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");

  const authCtx = useContext(AuthContext);
  const scheduleCtx = useContext(ScheduleContext);
  //console.log(scheduleCtx.games);

  const fbdB = getFirestore(props.firebaseConn);

  const expandOrCollapse = () => {
    setIsActive((prev) => {
      return !prev;
    });
  };

  const onOptionSelected = (e) => {
    //console.log('option selected')
    setOptionSelected(e.target.value);
    setBtnActive(true);
  };

  //console.log(optionSelected);

  const btnClasses = btnActive
    ? "btn btn-primary col-12"
    : "btn btn-secondary col-12 disabled";

  const navigate = useNavigate();

  const onEditingHandler = () => {
    navigate("/editgame/" + props.data.date);
  };

  const onDeletingHandler = () => {
    navigate("/deletegame/" + props.data.date);
  };

  const onPlaying = () => {
    const optIndex = props.data.options.findIndex(
      (option) => option.id === parseInt(optionSelected)
    );
    //console.log(optIndex);
    const optionsCopy = [...{ ...props.data }.options];
    optionsCopy[optIndex].signedUpUsers.push(authCtx.email);
    //console.log(optionsCopy);
    const newGame = {
      date: props.data.date,
      options: optionsCopy,
    };
    //Delete old game and add new one in Context
    scheduleCtx.removeGame(props.data.date);
    scheduleCtx.addGame(newGame);
    //Delete old game and add new one in Firebase
    const scheduleRef = doc(fbdB, "schedule", props.data.date);
    deleteDoc(scheduleRef).then((res) => {
      setDoc(doc(fbdB, "schedule", props.data.date), newGame, {
        merge: true,
      }).then((res) => {
        //console.log(res);
      });
    });
  };

  const gamedate = new Date(props.data.date + " EDT");

  const dayNumber = gamedate.getDay();
  console.log(dayNumber);
  const date = gamedate.getDate();
  console.log(date);
  const monthNumber = gamedate.getMonth();
  console.log(monthNumber);
  const year = gamedate.getFullYear();
  console.log(year);

  let day = "";
  switch (dayNumber) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
    default:
      day = "Sun";
  }

  let ordinal;

  if (date > 10 && date < 20) {
    ordinal = "th";
  } else {
    switch (date % 10) {
      case 1:
        ordinal = "st";
        break;
      case 2:
        ordinal = "nd";
        break;
      case 3:
        ordinal = "rd";
        break;
      default:
        ordinal = "th";
    }
  }
  //console.log(date);

  let month;
  switch (monthNumber) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      month = "";
  }
  return (
    <div className="card container p-0">
      <div className="d-flex justify-content-between card-header align-items-center">
        <h5 className="m-0">
          <a
            href="#collapse1"
            data-parent="#accordion"
            data-toggle="collapse"
            className="h-100 text-decoration-none text-secondary"
            onClick={expandOrCollapse}
          >
            {day}, {month} {date}
            {ordinal}, {year}
          </a>
        </h5>
        <div className="d-flex">
          {authCtx.isAdmin && (
            <div>
              <Button className="m-1 btn-light" onClick={onEditingHandler}>
                <img src={editSVG} alt="edit"></img>
              </Button>
              <Button className="m-1 btn-light" onClick={onDeletingHandler}>
                <img src={trashSVG} alt="delete"></img>
              </Button>
            </div>
          )}
          <div>
            {isActive ? (
              <Button className="m-1 btn-light" onClick={expandOrCollapse}>
                <img src={collapse} alt="collapse"></img>
              </Button>
            ) : (
              <Button className="m-1 btn-light" onClick={expandOrCollapse}>
                <img src={expand} alt="expand"></img>
              </Button>
            )}
          </div>
        </div>
      </div>

      {isActive && (
        <div id="collapse1" className="collapse show">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>From</th>
                  <th>To</th>
                  <th>Cost</th>
                  <th>Available Spots</th>
                  <th>Format</th>
                </tr>
              </thead>
              <tbody>
                {props.data.options.map((option) => {
                  return (
                    <tr key={option.id}>
                      <th scope="row">
                        {!option.signedUpUsers.includes(authCtx.email) &&
                          option.signedUpUsers.length <
                            parseInt(option.maxPlayers) && (
                            <input
                              className="form-check-input"
                              type="radio"
                              value={option.id}
                              name={option.date}
                              id={option.date}
                              onChange={onOptionSelected}
                            />
                          )}
                        {!option.signedUpUsers.includes(authCtx.email) &&
                          option.signedUpUsers.length ===
                            parseInt(option.maxPlayers) && (
                            <strong className="text-danger">SOLD OUT</strong>
                          )}
                        {option.signedUpUsers.includes(authCtx.email) && (
                          <img
                            src={checkCircle}
                            alt="You are playing this game"
                            className="bg-success rounded-circle"
                          ></img>
                        )}
                      </th>
                      <td>{option.timeFrom}</td>
                      <td>{option.timeTo}</td>
                      <td>{option.cost}$</td>
                      <td>
                        {parseInt(option.maxPlayers) -
                          option.signedUpUsers.length}
                      </td>
                      <td>{option.format}</td>
                    </tr>
                  );
                })}
                {/* <div className="form-check" key={option.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={option.date}
                    id={option.date}
                    onChange={onOptionSelected}
                  />
                  <label className="form-check-label">
                    {option.timeFrom + " to " + option.timeTo}
                    <p className="d-inline text-monospace">
                      ({option.cost}CAD)
                    </p>
                  </label>
                </div> */}
              </tbody>
            </table>
          </div>

          {authCtx.isLoggedIn ? (
            <button className={btnClasses} type="button" onClick={onPlaying}>
              Play!
            </button>
          ) : (
            <div className="alert alert-danger text-center">
              <strong>Please sign in to play</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
