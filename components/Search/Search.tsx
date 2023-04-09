import { TextInput } from "@avsync.live/formation";
import React, { useState, useEffect } from "react";

import * as Types from './types'
import { KnowledgePanel } from "./KnowledgePanel";
import { SearchResult } from "./SearchResult";
import { Translation } from "./Translation";
import { Dictionary } from "./Dictionary";

export const Search = () => {
  const [searchResults, setSearchResults] = useState<Types.SearchResultsData | null>(null);
  const [query, set_query] = useState('');

  async function fetchData() {
    try {
      const response = await fetch(`/tools/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = () => {
    fetchData();
  }

  return (
    <div>
      <TextInput 
        value={query}
        onChange={val => set_query(val)}
        onEnter={handleSearch}
        canClear={query !== ''}
        buttons={[
          {
            icon: 'search',
            iconPrefix: 'fas',
            onClick: handleSearch,
            minimal: true
          }
        ]}
      />
      {/* Display the knowledge panel */}
      <div>
        {searchResults?.data?.results && (
          <KnowledgePanel knowledge_panel={searchResults.data.results.knowledge_panel} />
        )}
      </div>

      {/* Display the translation component if it is defined */}
      {searchResults?.data?.results?.translation && (
        <Translation translation={searchResults.data.results.translation} />
      )}

      {/* Display the dictionary component if it is defined */}
      {searchResults?.data?.results?.dictionary && (
        <Dictionary dictionary={searchResults.data.results.dictionary} />
      )}

      {/* Display the search results */}
      <div>
        {searchResults?.data?.results && searchResults.data.results.results.map((result, index) => (
          <SearchResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
};