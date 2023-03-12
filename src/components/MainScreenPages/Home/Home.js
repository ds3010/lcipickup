import facilityImg from "../../../assets/images/facility-page.jpg"

const Home = () => {
    return (<div className="container">
        <div className="text-center">
            <h4>LCI Pickup Soccer</h4>
        </div>
        <div className="d-flex justify-content-center">
            <img src={facilityImg} alt="lci-pickup-soccer" style={{maxWidth: '50%'}}></img>
        </div>
        <div className="display-5 d-flex justify-content-center">
            <p>Every Sunday from 4pm to 6pm. Come join us at 350 Kipling Ave, Etobicoke, ON M8V 3L1</p>
        </div>
    </div>)
}
export default Home