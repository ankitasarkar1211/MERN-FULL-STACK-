// App.js

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "308013c";

  const searchMovie = async () => {
    if (!search) return;

    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const url = `https://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if(data.Response === "True") {
        setMovie(data);
      }
      else {
        setError("Movie not found");
        setMovie(null);
      }
    }
    catch(err) {
      setError("Failed to fetch movie data");
      setMovie(null);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchMovie}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {movie && (
        <div className="movie-card">
          <img src={movie.Poster} alt={movie.Title} />
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState } from 'react';

// const MovieSearch = () => {
//   const [search, setSearch] = useState('');
//   const [movie, setMovie] = useState(null); //composite data, an object, contains both strings and numbers
//   const [error, setError] = useState('');

//   const API_KEY = "308013c"

//   const searchMovie = async () => {
//     const url = `https://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`; //template literal

//     if(!search) return;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.Response === true || data.Response === "True") {
//         setMovie(data);
//         setError('');
//       } else {
//         setError(data.message);
//         setMovie(null);
//       }
//     } catch (err) {
//       setError('Failed to fetch movie data');
//       setMovie(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Movie Search App</h1>
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Enter movie name"
//       />
//       <button onClick={searchMovie}>Get Movie</button>
//       {error && <p>{error}</p>}
//       {movie && (
//         <div>
//           <h2>{movie.Title}</h2>
//           <p>IMDB Rating: {movie.imdbRating}</p>
//           <p>Year: {movie.Year}</p>
//           <p>Genre: {movie.Genre}</p>
//           <p>Director: {movie.Director}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieSearch;