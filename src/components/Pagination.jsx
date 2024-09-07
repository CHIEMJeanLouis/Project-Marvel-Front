const Pagination = ({ results, page, setPage, skip, setSkip, count }) => {
  // console.log(page);
  const lastPage = (count / 100).toFixed(0);

  if (page === 1 && results === 100) {
    return (
      <div className="pagination">
        <p
          onClick={() => {
            setPage(page + 1);
            setSkip(skip + 100);
          }}
        >
          Suivant
        </p>
      </div>
    );
  } else if (results < 100) {
    return;
  } else if (page === Number(lastPage)) {
    return (
      <div className="pagination">
        <p
          onClick={() => {
            setPage(page - 1);
            setSkip(skip - 100);
          }}
        >
          Précédent
        </p>
      </div>
    );
  } else {
    return (
      <div className="pagination">
        <p
          onClick={() => {
            setPage(page - 1);
            setSkip(skip - 100);
          }}
        >
          Précédent
        </p>
        <p
          onClick={() => {
            setPage(page + 1);
            setSkip(skip + 100);
          }}
        >
          Suivant
        </p>
      </div>
    );
  }
};

export default Pagination;
