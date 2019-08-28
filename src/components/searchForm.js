import React from 'react';

const SearchForm = () => (
    <form role="search" method="GET">
        <label htmlFor="search-input">
            <h1>Search posts</h1>
        </label>
        <input
            type="search"
            id="search-input"
            name="keywords"
            onChange={()=>{}}
        />
        <button type="submit">Submit</button>
    </form>
);

export default SearchForm;
