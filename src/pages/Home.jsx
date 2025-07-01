import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'fdaf50e7'; 

function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setMovies([]);
    setError(null);

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === 'True') {
        const uniqueMovies = Array.from(new Map(data.Search.map(m => [m.imdbID, m])).values());
        setMovies(uniqueMovies);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Movie Search App</h1>

      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search for movies..."
          className="px-4 py-2 rounded bg-gray-700 text-white w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
        />
        <button
          onClick={searchMovies}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
              alt={movie.Title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p className="text-gray-400">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
