import actions from '../actions';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
  error: '',
  loading: false,
};

const walletReduce = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case actions.REQUEST_API:
    return { ...state, loading: true };
  case actions.CURRENCIES:
    return { ...state, loading: false, currencies: action.payload, error: '' };
  case actions.SUM_CURRENCIES:
    return { ...state, totalExpense: action.payload };
  case actions.FAILED_REQUEST:
    return { ...state, loading: false, error: action.payload };
  case actions.EXCHANGE_RATES:
    return {
      ...state,
      loading: false,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default walletReduce;
