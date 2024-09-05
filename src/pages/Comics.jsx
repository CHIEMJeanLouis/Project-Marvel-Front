import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel--dcy6mcwbsfkq.code.run/comics`
        );
        setData(response.data);
        setIsLoading(false);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>En chargement...</div>
  ) : (
    <div className="character-container">
      <div className="character-top">
        <h1>Comics</h1>
        <input type="text" placeholder="Recherche" />
      </div>
      <div className="character-content">
        {data.results.map((item) => {
          return (
            <div key={item._id} className="char-card">
              <div className="char-card-pic">
                <img
                  src={item.thumbnail.path + "/portrait_medium.jpg"}
                  alt="pic of character"
                />
              </div>
              <div className="char-card-name">
                <p>{item.title}</p>
              </div>
              <div className="char-card-detail">{item.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
