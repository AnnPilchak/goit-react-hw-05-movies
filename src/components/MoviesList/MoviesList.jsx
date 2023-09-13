import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  return (
    <ul className={css.moviesList}>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  search: PropTypes.string,
};