import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/endPoints";
import { baseCommandUrl } from "../utils/endPoints";
import { FaHeart } from "react-icons/fa";
import Loader from "../../public/Loader.gif";

const Comic = () => {
  const { id } = useParams();
  //   console.log(id);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseCommandUrl}/comic/${id}`);
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
      <h1>{data.title}</h1>
      <img
        src={data.thumbnail.path + "/portrait_xlarge.jpg"}
        alt="comic couverture"
      />
      <p>{data.description}</p>
      <FaHeart />
    </div>
  );
};

export default Comic;
