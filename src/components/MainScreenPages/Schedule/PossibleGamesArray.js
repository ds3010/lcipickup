const PossibleGamesArray = [
  {
    id: process.env.REACT_APP_PAYMENTID_15,
    title: "15$",
    price: 15.0,
  },
  {
    id: process.env.REACT_APP_PAYMENTID_18,
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
