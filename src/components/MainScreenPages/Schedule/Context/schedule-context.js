import React, { useState } from "react";

const ScheduleContext = React.createContext({
  games: [],
  addGame: (game) => {},
  removeGame: (date) => {},
  clearGames: () => {},
});

export const ScheduleContextProvider = (props) => {
  const [games, setGames] = useState([]);

  const addGameHandler = (game) => {
    //console.log("Adding Game: ", game);
    setGames((prevState) => [...prevState, game]);
    //console.log("Adding Game TODO. schedule-context.js");
  };

  const removeGameHandler = (date) => {
    let currentGames = [...games];
    const existingGameIndex = currentGames.findIndex(
      (game) => game.date === date
    );

    currentGames.splice(existingGameIndex, 1);
    setGames(currentGames);
    //console.log("Removing Game TODO. schedule-context.js");
  };

  const clearGamesHandler = () => {
    //console.log("Clearing Games: ");
    //console.log(games);
    setGames([]);
  };

  const scheduleValue = {
    games: games,
    addGame: addGameHandler,
    removeGame: removeGameHandler,
    clearGames: clearGamesHandler,
  };
  return (
    <ScheduleContext.Provider value={scheduleValue}>
      {props.children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
