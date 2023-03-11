import Game from "./Game"

const Schedule = () => {

    const DUMMY_GAMES = [{
        date: "Sunday, March 12th, 2023",
        id: 0,
        options: [
            {            
                time: '4pm to 6pm',
                price: '20CAD',
                id: 0,
                date: "Sunday, March 12th, 2023",
            }
            ,{
                time: '5pm to 6pm',
                price: '18CAD',
                id: 1,
                date: "Sunday, March 12th, 2023",   
            }        
        ],
    },{
        date: "Sunday, March 19th, 2023",
        id: 1,
        options: [
            {            
                time: '4pm to 6pm',
                price: '20CAD',
                id: 0,
                date: "Sunday, March 19th, 2023",
            }
            ,{
                time: '5pm to 6pm',
                price: '18CAD',
                id: 1,
                date: "Sunday, March 19th, 2023",   
            }        
        ],
    },{
        date: "Sunday, March 26th, 2023",
        id: 2,
        options: [
            {            
                time: '4pm to 6pm',
                price: '20CAD',
                id: 0,
                date: "Sunday, March 26th, 2023"
            }
            ,{
                time: '5pm to 6pm',
                price: '18CAD',
                id: 1,
                date: "Sunday, March 26th, 2023"   
            }        
        ],
    }]

    return (
    <div id="accordion">
        {DUMMY_GAMES.map(game => (<Game data={game} key={game.id}></Game>))}
        
    </div>)

}

export default Schedule