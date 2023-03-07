//import { Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-secondary mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            LCI Pickup Soccer
          </a>
          <div className="text-right">
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
