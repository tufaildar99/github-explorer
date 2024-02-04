import "../styles/Repository.css";

export default function Repository({ repo }) {
  return (
    <li className="repository">
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <h4>{repo.language}</h4>
    </li>
  );
}
