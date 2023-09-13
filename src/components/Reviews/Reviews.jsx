import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/api';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState();

  const { id } = useParams();

  useEffect(() => {
    getMovieReviews(id)
      .then(({ results }) => {
        const data = {
          item: results.map(({ id, author, content }) => ({
            id,
            author,
            content,
          })),
        };

        const dataArr = Object.values(data).find(value => Array.isArray(value));

        setReviews(dataArr);
      })
      .catch(error => setError(error.message));
  }, [id]);

  return (
    <>
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map(({ id, author, content }) => {
            return (
              <li className={css.reviewsItem} key={id}>
                <p>Author: {author}</p>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        'We do not have any reviews for this movie.'
      )}
    </>
  );
};

export default Reviews;
