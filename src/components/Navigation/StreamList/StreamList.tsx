import React, { useState, useEffect } from "react";
import "./StreamList.css";
import { Trash2, Eye, EyeOff } from "lucide-react";

export const StreamList: React.FC = () => {
  const [streamList, setStreamList] = useState<any[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const storedStreamList = JSON.parse(localStorage.getItem('streamList') || '[]');
    setStreamList(storedStreamList);
    const storedWatchedMovies = JSON.parse(localStorage.getItem('watchedMovies') || '{}');
    setWatchedMovies(storedWatchedMovies);
  }, []);

  const handleRemoveFromStreamList = (id: number) => {
    const updatedList = streamList.filter((movie) => movie.id !== id);
    setStreamList(updatedList);
    localStorage.setItem('streamList', JSON.stringify(updatedList));
  };

  const toggleWatched = (id: number) => {
    const updatedWatchedMovies = { ...watchedMovies, [id]: !watchedMovies[id] };
    setWatchedMovies(updatedWatchedMovies);
    localStorage.setItem('watchedMovies', JSON.stringify(updatedWatchedMovies));
  };

  return (
    <div className="stream-list">
      <h2>Your Stream List</h2>
      <div className="movies-list">
        {streamList.length > 0 ? (
          streamList.map((movie) => (
            <div key={movie.id} className={`movie-card ${watchedMovies[movie.id] ? 'watched' : ''}`}>
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
                <div className="button-group">
                  <button
                    className="icon-btn"
                    onClick={() => toggleWatched(movie.id)}
                    title={watchedMovies[movie.id] ? "Mark as Unwatched" : "Mark as Watched"}
                  >
                    {watchedMovies[movie.id] ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => handleRemoveFromStreamList(movie.id)}
                    title="Remove from Stream List"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies in your Stream List. Add some from the Movies tab!</p>
        )}
      </div>
    </div>
  );
};
