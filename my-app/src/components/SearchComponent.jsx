import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('https://backend-9u85y37qu-jitu-gandhares-projects.vercel.app/api/search', { query });
            setResults(response.data);
        } catch (error) {
            console.error('Error searching quotes:', error);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((quote, index) => (
                    <li key={index}>{quote.content} - {quote.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
