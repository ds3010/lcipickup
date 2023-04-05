import facilityImg from "../../../assets/images/facility-page.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="backgroundImage">
      <div className="container pt-3">
        <div className="text-center">
          <h4>LCI Pickup Soccer</h4>
        </div>
        <div className="d-flex justify-content-center">
          {/* <img
          src={facilityImg}
          alt="lci-pickup-soccer"
          className="img-responsive"
        ></img> */}
        </div>
        <div className="display-5 d-flex justify-content-center text-center">
          <p>
            Every Sunday from 4pm to 6pm. Come join us at 350 Kipling Ave,
            Etobicoke, ON M8V 3L1
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
