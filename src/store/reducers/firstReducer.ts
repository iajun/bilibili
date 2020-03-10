import { Reducer } from 'redux';

interface FirstStore {
  name?: string;
}

const firstReducer: Reducer<FirstStore> = (initialState = {}, action) => {
  switch (action.type) {
    case 'getName':
      return { name: 'sharp' };
    default:
      return initialState;
  }
};

export default firstReducer;
