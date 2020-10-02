import { useEffect, useState } from 'react';

import MovieService from '../services/MovieService';

export default function useGetMovies(page, sortBy) {
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const getNewMovies = async (page, sortBy) => {
    if (page && sortBy) {
      try {
        setLoading(true);
        setError(false);

        const newMovies = await MovieService.getMovies(page, sortBy);

        setMovies(prevMovies => [...prevMovies, ...newMovies.results]);
        setHasMore(newMovies.page < newMovies.total_pages);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
  };

  useEffect(() => {
    getNewMovies(page, sortBy);
  }, [page, sortBy]);

  return { loading, error, movies, hasMore };
}
