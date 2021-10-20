import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesButton from '../components/CategoriesButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { fetchFoodApi } from '../redux/actions';
import './listRecipes.css';

class FoodRecipes extends Component {
  constructor(props) {
    super(props);
    this.redirectDetailsFood = this.redirectDetailsFood.bind(this);
  }

  componentDidMount() {
    const { fetchFood, location: { state } } = this.props;
    if (state) {
      fetchFood('filter.php?i=', state);
    } else {
      fetchFood('search.php?s=', '');
    }
  }

  redirectDetailsFood(id) {
    const { history } = this.props;
    history.push(`comidas/${id}`);
  }

  render() {
    const Comidas = 'Comidas';
    const { fetchFood } = this.props;
    return (
      <div className="body-list-recipes">
        <Header titlePage={ Comidas } fetchApi={ fetchFood } />
        <CategoriesButton category="meals" />
        <Recipes type={ Comidas } redirectDetailsFood={ this.redirectDetailsFood } />
        <Footer />
      </div>
    );
  }
}

FoodRecipes.propTypes = {
  fetchFood: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.node).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (payload1, payload2) => dispatch(fetchFoodApi(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(FoodRecipes);
