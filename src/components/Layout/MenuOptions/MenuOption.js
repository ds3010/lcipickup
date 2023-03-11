// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import ModalScreen from "../../UI/ModalScreen";

const MenuOption = (props) => {
  //console.log(props);

  const navigate = useNavigate();
  let content

  //Configuring the navigation depending on the option clicked
  const optionClicked = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === "Sign In") {
      
      // props.loggingIn();
    } else if (e.target.innerHTML === "Sign Out") {
      //console.log("Signing Out");

      //TODO: Create a component that renders a modal asking for confirmation to logout, the functionality to log out is at App.js with the onUserLogout function
      props.loggingOut();
    } else if (e.target.innerHTML === "Sign Up") {
      navigate('signupform')
      //props.loggingIn();
    } else if (e.target.innerHTML === "Schedule") {
      navigate("/schedule")
    } else if (e.target.innerHTML === "My Profile") {
      navigate("/profile")
    } 
  };

  return (
    <li className="nav-item ">
      <a onClick={optionClicked} className="nav-link text-center">
        <span role="button">{props.details.name}</span>
      </a>
    </li>
  );
};

export default MenuOption;
