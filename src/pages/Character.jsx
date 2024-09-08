import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/endPoints";
import { baseCommandUrl } from "../utils/endPoints";
import Loader from "../assets/images/Loader.gif";

const Character = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseCommandUrl}/comics/${id}`);
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div className="loader">
      <img src={Loader} alt="loader" />
    </div>
  ) : (
    <div>
      <h1>La liste des comics dans lesquels est apparu {data.name} :</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          marginTop: "30px",
        }}
      >
        {data.comics.map((comic) => {
          return (
            <div key={comic._id} className="comic-by-char-block">
              <div>
                <img
                  src={comic.thumbnail.path + "/portrait_xlarge.jpg"}
                  alt="Couverture de comics"
                />
              </div>
              <div>
                <div>
                  <h2>{comic.title}</h2>
                </div>
                <div>
                  <p>{comic.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Character;
