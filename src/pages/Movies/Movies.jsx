import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMovies } from 'services/api';import MoviesList from 'components/MoviesList/MoviesList';
import SearchBar from 'components/SearchBar/SearchBar';

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  // load movies on initial render or when search term changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    if (query) {
      setSearch(query);
      fetchMovies(query)
        .then(({ results }) => setMovies(results))
        .catch(error => setError(error));
    }
  }, [location.search]);

  const onMovieSearch = search => {
    setSearch(search);
    setMovies([]);
    // Update the URL with the search query
    navigate(`?query=${search}`);
  };

  return (
    <main>
      <SearchBar onSubmit={onMovieSearch} initialValue={search} />
      {error && <p>{error}</p>}
      {search && movies.length === 0 && (
        <p>
          We do not find any movie with such name. Please, try another keyword!
        </p>
      )}
      {search && movies.length > 0 && (
        <MoviesList movies={movies} search={search} />
      )}
    </main>
  );
};

export default Movies;