import actions from '../actions';

const INICIAL_STATE = {
  email: '',
};

const userReduce = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case actions.GET_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default userReduce;
