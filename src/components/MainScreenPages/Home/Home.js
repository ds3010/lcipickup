// import facilityImg from "../../../assets/images/facility-page.jpg";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import ScheduleContext from "../Schedule/Context/schedule-context";

const Home = () => {
  const ScheduleCtx = useContext(ScheduleContext)
  const [nextGame, setNextGame] = useState("")
  
  useEffect(() => {
    if (ScheduleCtx.games.length > 0) {
      const currentDate = new Date();
      const currentDateTs = currentDate.getTime();
      const futureGames = []
      ScheduleCtx.games.forEach((game) => {
        const thisGame = new Date(game.date);
        const thisGamets = thisGame.getTime();
        if (currentDateTs <= thisGamets + 86400000) {
          futureGames.push(game)
        }
      })
      futureGames.sort(function (a, b) {
        return (
          new Date(a.date + " EDT").getTime() - new Date(b.date + " EDT").getTime()
        );
      });
      setNextGame(futureGames[0])
    }
  },[ScheduleCtx.games.length])

  console.log(nextGame)

  return (
    <div className="ps-2 pe-2">
      <h3 className="pt-3 text-center">LCI Pickup</h3>
      <div className="pt-3 row">
        <div className="col-sm">
          <h4 className="text-center">
            Rules
          </h4>
          <ul>
            <li><small>Winner stays on for maximum of 2 matches in a row</small></li>
            <li><small>If the game ends in a tie, winner of previous comes off</small></li>
            <li><small>No slide tackling</small></li>
            <li><small>Respect a call if it is made, put your hand up to call your own foul</small></li>
            <li><small>If the ball goes out of bounds, it is replayed by a kick-in from the line</small></li>
            <li><small>The entire ball must be outside the line in order to be called out</small></li>
            <li><small>A re-kick is issued if a kick-in does not successfully enter in the field of play</small></li>
            <li><small>Keeper cannot pick up the ball if passed back by their own player except if it goes off any part of their teammates body other than their feet</small></li>
            <li><small>You may not score directly with a kick-in, free kick or corner</small></li>
            <li><small>A direct free kick is issued only if a player intentionally commits a hand-ball</small></li>
            <li><small>Teams must wear shirts of the same color (pinnies will be provided if needed)</small></li>
            <li><small>The ball will be an outdoor regulation ball (size 5)</small></li>
            <li><small>Smoking is not allowed in the facility</small></li>
            <li><small>Profane, abusive, or foul language is not tolerated</small></li>
            <li><small>No spitting is allowed</small></li>
            <li><small>Anyone caught fighting will be banned from the facility</small></li>
            <li><small>Climbing on the dome or equipment is not permitted</small></li>
          </ul>
        </div>
        <div className="col-sm text-center">
          {ScheduleCtx.games.length > 0 ? <>
              <h4>
                Next Date: {nextGame.date}
              </h4>
              {nextGame !== "" && nextGame.options.map(game => {
                return (<>
                  <p>++++++++++++++++++++++++++++++++</p>
                  <h4>
                    Times:
                  </h4>
                  <p>++++++++++++++++++++++++++++++++</p>
                  <p>{game.format}</p>
                  <p>{game.timeFrom} to {game.timeTo}</p>
                </>)
              })}

            </> : <h4>
            There are no games available currently
          </h4>}
        </div>
      </div>
    </div>
  );
};
export default Home;
