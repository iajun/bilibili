import { combineReducers } from 'redux';
import firstReducer from './firstReducer';

const combinedStore = combineReducers({
  firstReducer,
});

export default combinedStore;
