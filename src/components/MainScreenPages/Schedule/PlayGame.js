import ModalScreen from "../../UI/ModalScreen";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import ScheduleContext from "./Context/schedule-context";
import { getGameIdForPayment } from "./PossibleGamesArray";
import AuthContext from "../../Authentication/Context/auth-context";
import {
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const PlayGame = (props) => {
  const params = useParams();
  const scheduleCtx = useContext(ScheduleContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadingPaymentScreen, setLoadingPaymentScreen] = useState(false);

  const fbdB = getFirestore(props.firebaseConn);
  const game = {
    ...scheduleCtx.games.filter((game) => game.date === params.date)[0],
  };

  const optionsCopy = [...game.options];
  // console.log(optionsCopy[params.gameId].cost);
  // console.log("TEST");
  // console.log(getGameIdForPayment(optionsCopy[params.gameId].cost));

  const closeHandler = () => {
    navigate("/schedule");
  };

  const fbDb = getFirestore(props.firebaseConn);
  const onPaymentHandler = async () => {
    //Try to contact Stripe, if successful, set the gameToPlay attribute in firebase for this user to this game
    //console.log(authCtx.userId);
    const docRef = doc(fbDb, "users", authCtx.userId);
    await updateDoc(docRef, {
      gameToPlay: {
        date: params.date,
        gameId: params.gameId,
      },
    })
      .then((res) => {
        //console.log(res.json());
        if (authCtx.isOrganizer) {
          const game = {
            ...scheduleCtx.games.filter((game) => game.date === params.date)[0],
          };
          if (Object.keys(game).length > 0) {
            //console.log("Here");
            const optionsCopy = [...game.options];
            console.log(optionsCopy);
            if (
              !optionsCopy[parseInt(params.gameId)].signedUpUsers.includes(
                authCtx.email
              )
            ) {
              optionsCopy[parseInt(params.gameId)].signedUpUsers.push(
                authCtx.email
              );
              const newGame = {
                date: params.date,
                options: optionsCopy,
              };
              //Delete old game and add new one in Context
              scheduleCtx.removeGame(params.date);
              scheduleCtx.addGame(newGame);
              //Delete old game and add new one in Firebase
              const scheduleRef = doc(fbdB, "schedule", params.date);
              deleteDoc(scheduleRef).then((res) => {
                setDoc(doc(fbdB, "schedule", params.date), newGame, {
                  merge: true,
                }).then((res) => {
                  console.log(res);
                });
              });
            }
          }
          navigate(
            "/aaokyU3dphUVoJEMV6hQTaEhLiEn9z8eUTWugdCHNE014sp8zfEiV6YU9MaLtNwQi97H7WBhBHo21zqunD0ZgBgAJWj7fhqZy0BZ"
          );
        } else {
          setLoadingPaymentScreen(true);
          fetch("http://localhost:4000/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                { id: getGameIdForPayment(optionsCopy[params.gameId].cost) },
              ],
            }),
          })
            .then((res) => {
              return res.json();
            })
            .catch((error) => {
              console.log(error);
            })
            .then((response) => {
              if (response.url) {
                //console.log("HERE");
                window.location.assign(response.url); //Forwarding user to stripe
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //STRIPE CLIENT HERE TODO:

    //await
  };

  return (
    <ModalScreen title="Play">
      <div className="alert alert-danger text-center">
        <strong>
          Do you want to confirm you are playing on {params.date} from{" "}
          {optionsCopy[params.gameId].timeFrom} to{" "}
          {optionsCopy[params.gameId].timeTo}
        </strong>
      </div>
      <Button onClick={closeHandler} className="m-1 btn-secondary">
        Cancel
      </Button>
      <Button onClick={onPaymentHandler} className="m-1">
        Go Pay!
      </Button>
      <br />
      {loadingPaymentScreen && (
        <div className="alert alert-info text-center">
          <strong>Loading Payment Site...</strong>
        </div>
      )}
    </ModalScreen>
  );
};

export default PlayGame;
