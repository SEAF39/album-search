/* LiveSearch.js */

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "components/SearchBar";
import Error from "components/Error";
import Filters from "components/Filters";
import Results from "components/Results";

export default function LiveSearch(props) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (term === "") return; // Skip the API request if the search term is empty

    const searchURL = `https://itunes.apple.com/search?term=${term}&country=CA&media=music&entity=album&attribute=artistTerm`;
    axios
      .get(searchURL)
      .then(response => {
        console.log(response.data.results);
        setResults(response.data.results);
      })
      .catch(error => {
        console.error("Error fetching search results:", error);
        setResults([]);
        setError(true);
      });
  }, [term]);

  return (
    <Fragment>
      <header className="logo">
        <img src="images/brand.png" alt="Brand" />
      </header>
      <main>
        <SearchBar loading={false} onSearch={term => setTerm(term)} />
        <Error show={error} onClose={() => setError(false)}>
          The server returned an error.
        </Error>
        <Filters filters={filters} setFilter={(filter, value) => setFilters({ ...filters, [filter]: value })} />
        <Results results={results} filters={filters} />
      </main>
    </Fragment>
  );
}
