import Game from "./Game";
import AuthContext from "../../Authentication/Context/auth-context";
import ScheduleContext from "./Context/schedule-context";
import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NewGameForm from "./NewGameForm";
//import { useParams } from "react-router-dom";

const Schedule = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  const ScheduleCtx = useContext(ScheduleContext);
  const authCtx = useContext(AuthContext);
  const [reloadMessage, setReloadMessage] = useState(false);

  //const params = useParams();

  const onAddingGameHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

  //console.log(params.refresh);
  useEffect(() => {
    if (ScheduleCtx.games.length === 0) {
      console.log("Need to refresh");
      setReloadMessage(true);
    } else {
      setReloadMessage(false);
    }
  }, [ScheduleCtx.games.length]);

  //console.log("Schedule")
  //console.log(ScheduleCtx.games)

  // //Forcing a refreh
  // const [refreshed, setrefreshed] = useState(false)
  // if(!refreshed) {
  //   setrefreshed(true)
  // }
  const currentDate = new Date();
  //console.log(currentDate);
  const currentDateDate = currentDate.getDate();
  //const currentDateTs = currentDate.getTime();
  //console.log(currentDateTs);
  const currentDateMonth = currentDate.getMonth();
  const currentDateYear = currentDate.getFullYear();
  //console.log(currentDateDate, currentDateMonth, currentDateYear);
  let previousGames = [];
  let futureGames = [];
  let todayGames = [];
  let signedUpGames = [];
  ScheduleCtx.games.forEach((game) => {
    const gameCopy = { ...game };
    const thisGame = new Date(game.date + " EDT");
    // See if this game has an option where there current user has already signed up
    game.options.forEach((option) => {
      if (option.signedUpUsers.includes(authCtx.email)) {
        signedUpGames.push({
          date: game.date,
          timeTo: option.timeTo,
          timeFrom: option.timeFrom,
          format: option.format,
        });
      }
    });
    //console.log(thisGame);
    const thisGameDate = thisGame.getDate();
    const thisGameMonth = thisGame.getMonth();
    const thisGameYear = thisGame.getFullYear();
    if (thisGameYear > currentDateYear) {
      futureGames.push(gameCopy);
    } else if (thisGameYear < currentDateYear) {
      previousGames.push(gameCopy);
    } else if (thisGameMonth > currentDateMonth) {
      futureGames.push(gameCopy);
    } else if (thisGameMonth < currentDateMonth) {
      previousGames.push(gameCopy);
    } else if (thisGameDate > currentDateDate) {
      futureGames.push(gameCopy);
    } else if (thisGameDate < currentDateDate) {
      previousGames.push(gameCopy);
    } else {
      todayGames.push(gameCopy);
    }
  });

  futureGames.sort(function (a, b) {
    return (
      new Date(a.date + " EDT").getTime() - new Date(b.date + " EDT").getTime()
    );
  });
  previousGames.sort(function (a, b) {
    return (
      new Date(b.date + " EDT").getTime() - new Date(a.date + " EDT").getTime()
    );
  });
  signedUpGames.sort(function (a, b) {
    return (
      new Date(a.date + " EDT").getTime() - new Date(b.date + " EDT").getTime()
    );
  });

  // console.log("Future Games:", futureGames);
  // console.log("previous Games:", previousGames);
  // console.log("today Games:", todayGames);

  console.log(signedUpGames.length);
  return (
    <>
      <div className="container text-center">
        {/* <h3>Schedule</h3> */}
        {authCtx.isAdmin && (
          <Button
            className="d-block btn-success col-12"
            onClick={onAddingGameHandler}
          >
            Add Game
          </Button>
        )}
        {reloadMessage && (
          <>
            <br />
            <div className="alert alert-danger text-center">
              <strong>
                Please reload your browser as the information below might not be
                updated
              </strong>
            </div>
          </>
        )}
        <br />
        {isAdding && (
          <NewGameForm
            stopAdding={stopAddingHandler}
            firebaseApp={props.firebaseConn}
            date={""}
          ></NewGameForm>
        )}
      </div>
      {signedUpGames.length > 0 && (
        <>
          <div className="container">
            <h3 className="text-center">
              You have signed up for the following upcoming games
            </h3>
            <div className="alert alert-success text-center">
              {signedUpGames.map((game) => (
                <p>
                  <strong>
                    {`${game.date} from ${game.timeFrom} to ${game.timeTo}. Format: ${game.format}`}{" "}
                  </strong>
                </p>
              ))}
            </div>
          </div>
        </>
      )}
      {todayGames.length > 0 && (
        <div className="text-center">
          <h3 className="text-danger">There are some games available today!</h3>
          <div id="accordion">
            {todayGames.map((game) => (
              <Game
                data={game}
                key={game.date}
                firebaseConn={props.firebaseConn}
              ></Game>
            ))}
          </div>
        </div>
      )}
      {futureGames.length > 0 && (
        <div className="text-center">
          <h3>Upcoming Games</h3>
          <div id="accordion">
            {futureGames.map((game) => (
              <Game
                data={game}
                key={game.date}
                firebaseConn={props.firebaseConn}
              ></Game>
            ))}
          </div>
        </div>
      )}
      {/* {previousGames.length > 0 && (
        <div className="text-center">
          <h3>Previous Dates</h3>
          <div id="accordion">
            {previousGames.map((game) => (
              <Game
                data={game}
                key={game.date}
                firebaseConn={props.firebaseConn}
              ></Game>
            ))}
          </div>
        </div>
      )} */}
    </>
  );
};

export default Schedule;
