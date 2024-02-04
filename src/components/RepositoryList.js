import "../styles/RepositoryList.css";

import Repository from "./Repository";
export default function RepositoryList({ repos }) {
  return (
    <div className="repository-list">
      {repos.length > 0 ? <h2>Public Repositories</h2> : null}
      <ul className="repository-list-ul">
        {repos.map((repo) => (
          <Repository repo={repo} />
        ))}
      </ul>
    </div>
  );
}
