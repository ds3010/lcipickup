// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Authentication/Context/auth-context";
// import ModalScreen from "../../UI/ModalScreen";

const MenuOption = (props) => {
  //console.log(props);

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  //Configuring the navigation depending on the option clicked
  const optionClicked = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === "Sign In") {
      navigate("signinform");
      // props.loggingIn();
    } else if (e.target.innerHTML === "Sign Out") {
      //console.log("Signing Out");
      navigate("signout");
      //TODO: Create a component that renders a modal asking for confirmation to logout, the functionality to log out is at App.js with the onUserLogout function
      //props.loggingOut();
    } else if (e.target.innerHTML === "Sign Up") {
      navigate("signupform");
      //props.loggingIn();
    } else if (e.target.innerHTML === "Schedule") {
      navigate("/schedule");
    } else if (
      e.target.innerHTML === "Update Profile" ||
      e.target.innerHTML === authCtx.displayName + " Profile"
    ) {
      navigate("/profile");
    } else if (e.target.innerHTML === "Manage Users") {
      navigate("/users");
    }
  };

  return (
    <li className="nav-item ">
      {/*FOR BELOW LINE:  Line 36:7:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a 
      valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. 
      Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid */}
      <a onClick={optionClicked} className="nav-link text-center" href="#">
        <span role="button">{props.details.name}</span>
        {(props.details.name === "Update Profile" ||
          props.details.name === authCtx.displayName + " Profile") &&
          (authCtx.displayName === "" ||
            authCtx.firstName === "" ||
            authCtx.lastName === "" ||
            authCtx.phoneNumber === "") && (
            <span className="badge badge-danger bg-danger">!</span>
          )}
      </a>
    </li>
  );
};

export default MenuOption;
