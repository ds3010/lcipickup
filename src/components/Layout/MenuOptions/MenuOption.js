// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MenuOption = (props) => {
  //console.log(props);

  const navigate = useNavigate();

  //Configuring the navigation depending on the option clicked
  const optionClicked = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === "Sign In") {
      //console.log("Signing In");
      props.loggingIn();
    } else if (e.target.innerHTML === "Sign Out") {
      //console.log("Signing Out");
      props.loggingOut();
    } else if (e.target.innerHTML === "Games") {
      navigate("/games")
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
