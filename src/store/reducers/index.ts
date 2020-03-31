import { combineReducers } from 'redux';
import partitionReducer from './firstReducer';

const combinedStore = combineReducers({
  partitionReducer,
});

export default combinedStore;
