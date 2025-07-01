import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = 'fdaf50e7';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">← Back to Search</Link>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
          alt={movie.Title}
          className="w-full md:w-1/3 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
          <p className="text-gray-400 mb-4">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
          <p className="mb-4">{movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
