import { useEffect, useState } from 'react';
import { NavLink, useParams, Outlet, useNavigate } from 'react-router-dom';
import { getMovieById } from 'services/api';

import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  let activeStyle = {
    color: '#ff0000',
    textDecoration: 'underline',
  };

  useEffect(() => {
    getMovieById(id)
      .then(
        ({
          poster_path,
          title,
          release_date,
          vote_average,
          overview,
          genres,
        }) => {
          const info = {
            poster: poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : 'https://via.placeholder.com/200x300.png?text=No+Image',
            title,
            date: new Date(release_date).getFullYear(),
            popularity: (vote_average * 10).toFixed(0),
            overview,
            genresNames: genres.map(genre => genre.name).join(', '),
          };

          setDetails(info);
        }
      )
      .catch(error => setError(error));
  }, [id]);

  return (
    <main>
      <button
        className={css.backBtn}
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>

      {error && <p>{error}</p>}
      {details && (
        <div className={css.detailsWrap}>
          <div className={css.descr}>
            <img
              className={css.detailsImg}
              src={details.poster}
              alt={details.title}
            ></img>

            <div>
              <h1>
                {details.title} ({details.date})
              </h1>
              <p>User Score: {details.popularity}%</p>
              <h2>Overview</h2>
              {details.overview ? (
                <p>{details?.overview}</p>
              ) : (
                'Sorry, there is no overview!'
              )}
              <h3>Genres</h3>
              <p>{details.genresNames}</p>
            </div>
          </div>

          <div>
            <h4>Additional information</h4>
            <ul className={css.infoWrap}>
              <li>
                <NavLink
                  to="cast"
                  replace
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  replace
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Outlet />
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetails;