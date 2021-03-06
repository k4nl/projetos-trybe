import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.playAgain = this.playAgain.bind(this);
    this.getRankingPage = this.getRankingPage.bind(this);
  }

  getRankingPage() {
    const { history } = this.props;

    history.push('/ranking');
  }

  playAgain() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    const limiar = 3;
    const messageText = assertions >= limiar ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ messageText }</p>
        <p data-testid="feedback-total-question"> 0 </p>
        <p> Pontuação Final </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <button
          onClick={ this.playAgain }
          data-testid="btn-play-again"
          type="button"
        >
          Jogar Novamente
        </button>
        <button
          onClick={ this.getRankingPage }
          type="button"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps, null)(FeedBack);
