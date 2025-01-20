import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader/loader.jsx"; // Assuming the Loader component is in the same directory

function TrailerMovies({movies}) {
//   const [movies, setMovies] = useState([]); // To store movie list
  const [trailerMovies, setTrailerMovies] = useState({}); // To store movie trailers
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8";

  // Fetch popular movies
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
//         );
//         setMovies(response.data.results);
//       } catch (error) {
//         console.log("Error fetching movies:", error);
//       } finally {
//         setIsLoading(false); // Stop loading whether it succeeds or fails
//       }
//     };

//     fetchMovies();
//   }, []); // Empty dependency array ensures this runs only once

  // Fetch trailers for the movies
  useEffect(() => {
    const fetchMovieTrailers = async () => {
      const newTrailers = {};

      for (const movie of movies) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
          );

          // Find the first YouTube trailer
          const trailer = response.data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );

          if (trailer) {
            newTrailers[movie.id] = `https://www.youtube.com/embed/${trailer.key}`;
          }
        } catch (error) {
          console.log(`Error fetching trailer for movie ${movie.id}:`, error);
        }finally{
        setIsLoading(false)
      }
      }

      setTrailerMovies(newTrailers); // Update the state once for all trailers
    };

    if (movies.length > 0) {
      fetchMovieTrailers();
    }
  }, [movies]); // Fetch trailers only when movies are loaded

  // Conditional rendering with Loader
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="movie-list">
      <h2>Movies and Trailers</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            
            {trailerMovies[movie.id] ?  (
                <div>
                <Loader/>
              <iframe
                className="trailer"
                width="100%"
                height="315"
                src={trailerMovies[movie.id]}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              </div>
            ) : (
              <p>No trailer available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrailerMovies;
