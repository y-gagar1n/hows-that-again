import React, { useState } from 'react'
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

const Search = () => {
    const [results, setResults] = useState([]);
    if (window.__LUNR__) {
        window.__LUNR__.__loaded.then(lunr => {
            const refs = lunr.en.index.search('architecture');
        });
    }

    return <div>
        <SearchForm />
        <SearchResults />
    </div>
};

export default Search;
