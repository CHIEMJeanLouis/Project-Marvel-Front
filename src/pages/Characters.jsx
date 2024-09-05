import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel--dcy6mcwbsfkq.code.run/characters`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>is Loading ...</div>
  ) : (
    <div className="character-container">
      <div className="character-top">
        <h1>Personnages</h1>
        <input
          type="text"
          // value={search}
          placeholder="Recherche"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="character-content">
        {data.results.map((item) => {
          //console.log(item);
          return (
            <Link to={`/character/${item._id}`} key={item._id}>
              <div className="char-card">
                <div className="char-card-pic">
                  <img
                    src={item.thumbnail.path + "/portrait_medium.jpg"}
                    alt="pic of character"
                  />
                </div>
                <div className="char-card-name">
                  <FaHeart />
                  <p>{item.name}</p>
                </div>
                <div className="char-card-detail">{item.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <p>1-100 / </p>
      <Link to={`/characters`}>
        <p>101-200</p>
      </Link>
    </div>
  );
};

export default Characters;
