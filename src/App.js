import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import UserSearch from "./components/UserSearch";
import Profile from "./components/Profile";
import RepositoryList from "./components/RepositoryList";

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
