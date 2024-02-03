import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";

export default function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [query, setQuery] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);

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
          // Handle error, e.g., display a message or log it
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

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSubmitClicked(true);
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
      />
      <Profile userDetails={userDetails} />
      <RepositoryList />
    </div>
  );
}

function UserSearch({ query, onSearch, onInputChange }) {
  return (
    <div className="user-search">
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

function RepositoryList() {
  return (
    <div className="repository-list">
      <h2>Top Repositories</h2>
      <ul>
        <Repository />
        <Repository />
        <Repository />
      </ul>
    </div>
  );
}

function Repository() {
  return (
    <li className="repository">
      <h3>Name : Github Explorer</h3>
      <p>
        This is a GitHub explorer that helps users to interact with the GitHub
        API and fetch user details
      </p>
      <h4>Languages : Html CSS Javascript</h4>
    </li>
  );
}
