import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { baseUrl } from "../utils/endPoints";
import { baseCommandUrl } from "../utils/endPoints";
import Cookies from "js-cookie";

import Aïe from "../assets/images/Aïe.webp";

//import de components

import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Characters = ({ fav, setFav }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState();
  const [results, setResults] = useState();

  const [click, setClick] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseCommandUrl}/characters?name=${search}&skip=${skip}`
      );
      setData(response.data);
      setCount(response.data.count);
      setResults(response.data.results.length);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page]);

  return isLoading ? (
    <div className="loader">
      <img src={Aïe} alt="Loader douloureux xD" />
    </div>
  ) : results ? (
    <div className="character-container">
      <div className="character-top">
        <h1>Personnages</h1>
        <Search
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          setSkip={setSkip}
        />
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        skip={skip}
        setSkip={setSkip}
        count={count}
        results={results}
      />

      <div className="character-content">
        {data.results.map((item) => {
          const handleFavorites = (id) => {
            const copyFav = [...fav];
            copyFav.push(id);
            setFav(copyFav);
            fav.map((id) => {
              return Cookies.set("favorite-char", fav);
            });
          };

          return (
            <div className="favorite" key={item._id}>
              <div
                className="heart"
                onClick={() => {
                  handleFavorites(item._id);
                  setClick(true);
                }}
              >
                <FaHeart />
              </div>

              <div className="char-card">
                <div className="char-card-pic">
                  <img
                    src={item.thumbnail.path + "/portrait_medium.jpg"}
                    alt="pic of character"
                  />
                </div>
                <Link to={`/character/${item._id}`}>
                  <div className="char-card-name">
                    <p>{item.name}</p>
                  </div>
                </Link>
                <div className="char-card-detail">{item.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        skip={skip}
        setSkip={setSkip}
        count={count}
        results={results}
      />
    </div>
  ) : (
    <div className="noresult">
      <Search search={search} setSearch={setSearch} />
      <h1> No results found</h1>
    </div>
  );
};

export default Characters;
