import logo from "../assets/images/LogoMarvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <img className="logo" src={logo} alt="logo marvel" />
      </div>
      <div className="background-nav">
        <ul className="navigation">
          <Link to="/characters">
            <li>Personnages</li>
          </Link>
          <Link to="/comics">
            <li>Comics</li>
          </Link>
          <Link to="/favoris">
            <li>Favoris</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
