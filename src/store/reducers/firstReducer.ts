import { Partition } from '@typings/graphql';
import { Reducer } from 'redux';

const partitionReducer: Reducer<Partition[]> = (initialState = [], action) => {
  switch (action.type) {
    default:
      return initialState;
  }
};

export default partitionReducer;
