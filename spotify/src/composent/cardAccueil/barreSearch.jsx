import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function SearchResults({ results }) {
    return (
        <div className="search-results">
            {results.map(result => (
                <Link to={`/albumRedirection/artist/${result.id}`} className="result-link">
                    <div>{result.name}</div>
                </Link>
            ))}
        </div>
    );
}
function Searchbar() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultsArt, setSearchResultsArt] = useState([]);
    const [search, setSearch] = useState('');

    const fetchData = () => {
        fetch('http://localhost:8000/artists')
            .then((response) => response.json())
            .then((response) => {
                setSearchResultsArt(response)
            })
        fetch('http://localhost:8000/albums')
            .then((response) => response.json())
            .then((response) => {
                setSearchResults(response)
            })
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);
    };
    const filteredResultsArtist = searchResultsArt.filter((art) => {
        return art.name.toLowerCase().includes(search)
    });
    const filteredResultsAlbum = searchResults.filter((album) => album.name.toLowerCase().includes(search));
    const combinedFilteredResults = [...filteredResultsArtist, ...filteredResultsAlbum];
    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Rechercher..."
                className="search-input"
            />
            {search && <SearchResults results={combinedFilteredResults} />}
        </div>
    );
}
export default Searchbar;