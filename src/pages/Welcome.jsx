import { Link } from "react-router-dom";
import { GiSpiderWeb } from "react-icons/gi";
import { GiAmericanShield } from "react-icons/gi";
import { GiIronMask } from "react-icons/gi";
import { GiThorHammer } from "react-icons/gi";

const Welcome = () => {
  return (
    <div className="welcome">
      <Link to="/characters">
        <h1>Bienvenue sur le site des années 90 Marvel</h1>
      </Link>
      <div>
        <h2 className="icons">
          <GiSpiderWeb /> <GiAmericanShield /> <GiIronMask />
          <GiThorHammer />
        </h2>
      </div>
    </div>
  );
};

export default Welcome;
