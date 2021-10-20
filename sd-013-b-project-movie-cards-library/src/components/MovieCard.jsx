import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

class MovieCard extends React.Component {
  render() {
    const { movie: { title, subtitle, storyline, rating, imagePath } } = this.props;
    return (
      <article className="movie-card">
        <div className="movie-card-body">
          <img className="movie-card-image" src={ imagePath } alt={ title } />
          <h4 className="movie-card-title">{ title }</h4>
          <h5 className="movie-card-subtitle">{ subtitle }</h5>
          <p className="movie-card-storyline">
            { storyline }
          </p>
        </div>
        <div>
          <Rating rating={ rating } />
        </div>
      </article>
    );
  }
}

export default MovieCard;

MovieCard.propTypes = { movie: PropTypes.oneOfType([PropTypes.object]).isRequired };
