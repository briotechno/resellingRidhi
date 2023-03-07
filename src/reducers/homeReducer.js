import {GET_DASHBOARD} from '../actions/types';

const INITIAL_STATE = {
  // Initial state list
  dashboardList: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return {...state, dashboardList: action.payload};
    default:
      return state;
  }
};
