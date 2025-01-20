import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchMovies(type, apiKey, page) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&page=${page}`
        );
        setMovies(prevMovies => [...prevMovies, ...response.data.results]);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(err.message || "An error occurred while fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type, apiKey, page]);

  return { movies, loading, error, totalPages };
}

export default useFetchMovies;
