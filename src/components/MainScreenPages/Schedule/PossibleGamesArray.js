//1-hour-game: price_1Mro2NA8xt4rMlKr2g4Ve0eQ
//1-hour-game-extended: price_1Mro42A8xt4rMlKrHIHeGK6h

const PossibleGamesArray = [
  {
    id: "price_1MrsXNA8xt4rMlKrCvgrVwEz",
    title: "15$",
    price: 15.0,
  },
  {
    id: "price_1MrsXuA8xt4rMlKr0XKraP0C",
    title: "18$",
    price: 18.0,
  },
];

function getGameIdForPayment(title) {
  let gameId = PossibleGamesArray.find((game) => game.title === title).id;

  if (gameId === undefined) {
    console.log("Product id does not exist for title: " + title);
    return undefined;
  }

  return gameId;
}

export { PossibleGamesArray, getGameIdForPayment };
