import { combineReducers } from 'redux';
import userReduce from './user';
import walletReduce from './wallet';

const reducer = combineReducers({
  user: userReduce,
  wallet: walletReduce,
});

export default reducer;
