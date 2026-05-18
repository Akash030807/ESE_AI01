import "./SearchFilter.css";

function SearchFilter({
  searchDepartment,
  setSearchDepartment,
  searchName,
  setSearchName,
  searchEmployees,
}) {

  return (
    <div className="search-filter">

      <input
        type="text"
        placeholder="Search by Department"
        value={searchDepartment}
        onChange={(e) =>
          setSearchDepartment(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) =>
          setSearchName(e.target.value)
        }
      />

      <button onClick={searchEmployees}>
        Search
      </button>

    </div>
  );
}

export default SearchFilter;