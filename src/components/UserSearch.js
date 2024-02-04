import logo from "../assets/logo.svg";
import "../styles/UserSearch.css";

export default function UserSearch({
  query,
  onSearch,
  onInputChange,
  initialLoad,
}) {
  return (
    <div className={initialLoad ? "user-search" : "user-search-2"}>
      <img src={logo} alt="null" />
      <h3>Enter GitHub username</h3>
      <input type="text" value={query} onChange={onInputChange} />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}
