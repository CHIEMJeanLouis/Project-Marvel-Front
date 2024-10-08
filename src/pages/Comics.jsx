import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../utils/endPoints";
import { baseCommandUrl } from "../utils/endPoints";
import Loader from "../../public/Loader.gif";

import Pagination from "../components/Pagination";
import Search from "../components/Search";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState();
  const [results, setResults] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseCommandUrl}/comics?title=${search}&skip=${skip}`
        );
        setData(response.data);
        setCount(response.data.count);
        setResults(response.data.results.length);
        setIsLoading(false);
        if (results < 100) {
          setSkip(0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, page]);

  return isLoading ? (
    <div className="loader">
      <img src={Loader} alt="loader" />
    </div>
  ) : results ? (
    <div className="character-container">
      <div className="character-top">
        <h1>Comics</h1>
        <Search setSearch={setSearch} setPage={setPage} setSkip={setSkip} />
      </div>
      {results === 100 && (
        <Pagination
          page={page}
          setPage={setPage}
          skip={skip}
          setSkip={setSkip}
          count={count}
          results={results}
        />
      )}

      <div className="character-content">
        {data.results.map((item) => {
          console.log(item);
          return (
            <Link to={`/comic/${item._id}`} key={item._id}>
              <div className="char-card">
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
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="noresult">
      <Search search={search} setSearch={setSearch} />
      <h1> No results found</h1>
    </div>
  );
};

export default Comics;
