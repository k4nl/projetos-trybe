import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const {
      movie: {
        id,
        title,
        subtitle,
        storyline,
        rating,
        imagePath,
      },
    } = this.props;

    return (
      <article data-testid="movie-card" className="movie-card">
        <div className="movie-card-body">
          <img className="movie-card-image" src={ imagePath } alt={ title } />
          <h1 className="movie-card-title">{ title }</h1>
          <h2 className="movie-card-subtitle">{ subtitle }</h2>
          <p className="movie-card-storyline">{ storyline }</p>
          <div>
            <div className="movie-card-rating">
              <Link to={ `/movies/${id}` }>VER DETALHES</Link>
              <div className="rating">
                { rating }
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default MovieCard;

MovieCard.propTypes = { movie: PropTypes.oneOfType([PropTypes.object]).isRequired };
