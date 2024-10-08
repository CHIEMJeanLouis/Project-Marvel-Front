import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../utils/endPoints";
import Loader from "../../public/Loader.gif";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { baseCommandUrl } from "../utils/endPoints";

const Favoris = ({ fav, setFav }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const savedFav = Cookies.get("favorite-char");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseCommandUrl}/characters?name=&skip=&`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Cookies.set("favorite-char", fav);
    fetchData();
  }, []);

  return isLoading ? (
    <div>
      <img src={Loader} alt="loader" />
    </div>
  ) : savedFav ? (
    <div>
      <button
        onClick={() => {
          Cookies.remove("favorite-char");
          setFav([]);
        }}
      >
        Effacez tous les favoris
      </button>
      {data.results.map((item) => {
        return (
          <div key={item._id}>
            {fav.includes(item._id) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <div
                  onClick={() => {
                    // console.log(fav, Cookies.get("favorite-char"));
                    fav.map((id, index) => {
                      const copyFav = [...fav];
                      // console.log(index);
                      copyFav.splice(index);
                      setFav(copyFav);
                    });
                  }}
                >
                  <BsFillHeartbreakFill />
                </div>
                <Link to={`/character/${item._id}`}>
                  <div className="char-card">
                    <div className="char-card-pic">
                      <img
                        src={item.thumbnail.path + "/portrait_medium.jpg"}
                        alt="pic of character"
                      />
                    </div>
                    <div className="char-card-name">
                      <p>{item.name}</p>
                    </div>
                    <div className="char-card-detail">{item.description}</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <h1>Aucun favoris pour le moment. Toute facon, la page déconne xD</h1>
  );
};

export default Favoris;
