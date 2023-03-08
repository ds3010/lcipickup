const MenuOption = (props) => {
  //console.log(props);

  const optionClicked = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === "Sign In") {
      //console.log("Signing In");
      props.loggingIn();
    } else if (e.target.innerHTML === "Sign Out") {
      //console.log("Signing Out");
      props.loggingOut();
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
