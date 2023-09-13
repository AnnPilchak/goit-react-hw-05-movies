import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'services/api';
import css from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState();

  const { id } = useParams();

  useEffect(() => {
    getMovieCredits(id)
      .then(({ cast }) => {
        const data = {
          item: cast.map(({ cast_id, profile_path, name, character }) => ({
            id: cast_id,
            img: profile_path
              ? `https://image.tmdb.org/t/p/original/${profile_path}`
              : 'https://via.placeholder.com/200x300.png?text=No+Image',
            name,
            character,
          })),
        };

        const dataArr = Object.values(data).find(value => Array.isArray(value));

        setCast(dataArr);
      })
      .catch(error => {
        setError(error);
      });
  }, [id]);

  return (
    <>
      {error && <p>{error}</p>}
      {cast && cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map(({ id, img, name, character }) => {
            return (
              <li className={css.castItem} key={id}>
                <img className={css.castImg} src={img} alt={name}></img>
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        'We do not find the cast for this movie.'
      )}
    </>
  );
};

export default Cast;