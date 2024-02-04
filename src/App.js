import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import logo from "./assets/logo.svg";

export default function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [query, setQuery] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);
  const [repos, setRepos] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (submitClicked && inputChanged && query.trim() !== "") {
        try {
          const octokit = new Octokit({});
          const response = await octokit.request("GET /users/{username}", {
            username: query,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          setUserDetails(null);
        } finally {
          setSubmitClicked(false);
          setInputChanged(false);
        }
      }
    }

    fetchData();
  }, [submitClicked, inputChanged, query]);

  useEffect(() => {
    async function fetchRepos() {
      if (submitClicked && inputChanged && query.trim() !== "") {
        try {
          const octokit = new Octokit({});
          const response = await octokit.request(
            "GET /users/{username}/repos",
            {
              username: query,
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );
          setRepos(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          setRepos(null);
        } finally {
          setSubmitClicked(false);
          setInputChanged(false);
        }
      }
    }

    fetchRepos();
  }, [submitClicked, inputChanged, query]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSubmitClicked(true);
      setInitialLoad(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setInputChanged(true);
  };

  return (
    <div className="app">
      <UserSearch
        query={query}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        initialLoad={initialLoad}
      />

      <Profile userDetails={userDetails} />
      <RepositoryList repos={repos} />
    </div>
  );
}

function UserSearch({ query, onSearch, onInputChange, initialLoad }) {
  return (
    <div className={initialLoad ? "user-search" : "user-search-2"}>
      <img src={logo} alt="null" />
      <h3>Enter GitHub username</h3>
      <input type="text" value={query} onChange={onInputChange} />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

function Profile({ userDetails }) {
  if (!userDetails) {
    console.log("Userdetails is null"); // or render a loading message
    return null;
  }

  const { avatar_url, name, followers, following } = userDetails;

  return (
    <div className="profile">
      <div className="avatar">
        <img src={avatar_url} alt="" />
      </div>
      <div className="profile-info">
        <h2>{name}</h2>
        <h6>Followers : {followers}</h6>
        <h6>Following : {following}</h6>
      </div>
    </div>
  );
}

function RepositoryList({ repos }) {
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

function Repository({ repo }) {
  return (
    <li className="repository" onClick={repo.owner.html_url}>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <h4>{repo.language}</h4>
    </li>
  );
}
