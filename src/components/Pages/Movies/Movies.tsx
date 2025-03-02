import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const Movies: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    const storedQuery = localStorage.getItem('movieSearchQuery');

    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
    if (query.trim()) {
      localStorage.setItem('movieSearchQuery', query);
    }
  }, [movies, query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query,
        },
      });

      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddToStreamList = (movie: any) => {
    const currentStreamList = JSON.parse(localStorage.getItem('streamList') || '[]');
    const isAlreadyAdded = currentStreamList.some((m: any) => m.id === movie.id);

    if (!isAlreadyAdded) {
      const updatedStreamList = [...currentStreamList, movie];
      localStorage.setItem('streamList', JSON.stringify(updatedStreamList));
      alert(`${movie.title} added to your Stream List!`);
    } else {
      alert(`${movie.title} is already in your Stream List.`);
    }
  };

  return (
    <div className="movies-page">
      <h2>Search Movies</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date || 'N/A'}</p>
                <p>{movie.overview || 'No description available.'}</p>
                <button onClick={() => handleAddToStreamList(movie)}>Add to Stream List</button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found. Try searching for something!</p>
        )}
      </div>
    </div>
  );
};

