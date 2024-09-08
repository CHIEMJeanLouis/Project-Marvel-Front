import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../utils/endPoints";
import Loader from "../assets/images/Loader.gif";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BsFillHeartbreakFill } from "react-icons/bs";

const Favoris = ({ fav, setFav }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const savedFav = Cookies.get("favorite-char");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/characters?name=&skip=&`);
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
  ) : (
    <div>
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
  );
};

export default Favoris;
