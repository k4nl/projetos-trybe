import React from 'react';
import PropTypes from 'prop-types';
import BtnSubmitEvaluation from './BtnSubmitEvaluation';
import CommentBox from './CommentBox';
import Rating from './Rating';
import EmailBox from './EmailBox';

export default class EvaluationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      rating: 0,
      email: '',
    };

    this.getComment = this.getComment.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getRating = this.getRating.bind(this);
  }

  getComment({ target }) {
    this.setState({ comment: target.value });
  }

  getEmail({ target }) {
    this.setState({ email: target.value });
  }

  getRating({ target }) {
    this.setState({ rating: target.value });
  }

  render() {
    const { id } = this.props;
    const { comment, rating, email } = this.state;
    return (
      <section>
        <form
          className="coloumn is-flex my-3 is-justify-content-space-around"
        >
          <EmailBox getEmail={ this.getEmail } />
          <Rating getRating={ this.getRating } />
          <CommentBox getComment={ this.getComment } />
          <BtnSubmitEvaluation
            comment={ comment }
            email={ email }
            rating={ rating }
            id={ id }
          />
        </form>
      </section>
    );
  }
}

EvaluationForm.defaultProps = {
  id: undefined,
};

EvaluationForm.propTypes = {
  id: PropTypes.string,
};
