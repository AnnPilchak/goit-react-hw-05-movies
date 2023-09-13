import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from 'services/api';
import MoviesList from 'components/MoviesList/MoviesList';

import css from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchTrendingMovies()
      .then(({ results }) => {
        setMovies(results);
      })
      .catch(error => setError(error));
  }, []);

  return (
    <main>
      {error && <p>{error}</p>}
      <h1 className={css.pageTitle}>Trending today</h1>
      <MoviesList movies={movies} />
    </main>
  );
};

export default Home;