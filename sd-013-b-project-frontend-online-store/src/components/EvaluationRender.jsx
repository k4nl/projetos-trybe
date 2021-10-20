import React from 'react';
import PropTypes from 'prop-types';
import EvaluationCard from './EvaluationCard';
import EmptyEvaluation from './EmptyEvaluation';

export default class EvaluationRender extends React.Component {
  constructor(props) {
    super(props);

    this.parseEvaluation = this.parseEvaluation.bind(this);
  }

  parseEvaluation() {
    const data = localStorage.getItem('evaluations');
    let parsedData = [];
    if (data) {
      parsedData = JSON.parse(data);
      return parsedData;
    }
    return parsedData;
  }

  render() {
    const { id } = this.props;
    const match = this.parseEvaluation().filter((evaluation) => evaluation.id === id);
    const HEXAMIN = 0xfffff;
    const HEXAMAX = 1000000;
    const BITS = 16;
    return (
      <section>
        <div className="">
          { (match.length !== 0)
            ? (match.map((evaluation) => {
              const { email, comment, rating } = evaluation;
              const key = (Math.random() * HEXAMIN * HEXAMAX).toString(BITS);
              return (
                <EvaluationCard
                  key={ key }
                  email={ email }
                  comment={ comment }
                  rating={ rating }
                />
              );
            }))
            : <EmptyEvaluation /> }
        </div>
      </section>
    );
  }
}

EvaluationRender.defaultProps = {
  id: undefined,
};

EvaluationRender.propTypes = {
  id: PropTypes.string,
};
