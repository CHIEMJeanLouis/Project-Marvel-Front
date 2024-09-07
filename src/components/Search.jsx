const Search = ({ search, setSearch, setSkip, setPage }) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="Recherche"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
          setSkip(0);
        }}
      />
    </div>
  );
};

export default Search;
