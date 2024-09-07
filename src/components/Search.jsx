const Search = ({ setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Recherche"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
