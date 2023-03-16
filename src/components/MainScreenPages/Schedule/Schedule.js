import Game from "./Game";
import AuthContext from "../../Authentication/Context/auth-context";
import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NewGameForm from "./NewGameForm";
import { getDocs, collection, getFirestore } from "firebase/firestore";
//import { doc, getDoc } from "firebase/firestore";

const Schedule = (props) => {
  //console.log(props.schedule);
  const [isAdding, setIsAdding] = useState(false);
  const [scheduleDocsRef, setScheduleDocsRef] = useState(null);
  console.log(scheduleDocsRef);
  let games = [];
  const fbDb = getFirestore(props.firebaseApp);

  //Cant update the scheduleDocsRef with the below code
  useEffect(() => {
    const colRef = collection(fbDb, "schedule");
    //console.log(colRef);
    setScheduleDocsRef(colRef);
  }, []);

  //We are only not getting the date (key)
  if (scheduleDocsRef !== null) {
    getDocs(scheduleDocsRef).then((res) => {
      res.forEach((doc) => {
        games.push(doc.data());
        console.log(doc.data().timeTo);
        console.log(doc.data().timeFrom);
        console.log(doc.data().cost);
      });
    });
  }

  console.log(games);

  const authCtx = useContext(AuthContext);
  //   console.log(authCtx.isAdmin);

  const DUMMY_GAMES = [
    {
      date: "Sunday, March 12th, 2023",
      id: 0,
      options: [
        {
          time: "4pm to 6pm",
          price: "20CAD",
          id: 0,
          date: "Sunday, March 12th, 2023",
        },
        {
          time: "5pm to 6pm",
          price: "18CAD",
          id: 1,
          date: "Sunday, March 12th, 2023",
        },
      ],
    },
    {
      date: "Sunday, March 19th, 2023",
      id: 1,
      options: [
        {
          time: "4pm to 6pm",
          price: "20CAD",
          id: 0,
          date: "Sunday, March 19th, 2023",
        },
        {
          time: "5pm to 6pm",
          price: "18CAD",
          id: 1,
          date: "Sunday, March 19th, 2023",
        },
      ],
    },
    {
      date: "Sunday, March 26th, 2023",
      id: 2,
      options: [
        {
          time: "4pm to 6pm",
          price: "20CAD",
          id: 0,
          date: "Sunday, March 26th, 2023",
        },
        {
          time: "5pm to 6pm",
          price: "18CAD",
          id: 1,
          date: "Sunday, March 26th, 2023",
        },
      ],
    },
  ];

  const onAddingGameHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

  return (
    <>
      <div className="container text-center">
        <h3>Schedule</h3>
        {authCtx.isAdmin && (
          <Button
            className="d-block btn-success col-12"
            onClick={onAddingGameHandler}
          >
            Add Game
          </Button>
        )}
        <br />
        {isAdding && (
          <NewGameForm
            stopAdding={stopAddingHandler}
            firebaseApp={props.firebaseConn}
          ></NewGameForm>
        )}
      </div>
      <div id="accordion">
        {DUMMY_GAMES.map((game) => (
          <Game data={game} key={game.id}></Game>
        ))}
      </div>
    </>
  );
};

export default Schedule;
