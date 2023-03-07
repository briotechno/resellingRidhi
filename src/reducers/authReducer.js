import {LOGIN_USER, REGISTER_USER} from '../actions/types';

const INITIAL_STATE = {
  // Initial state list
  userData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, userData: action.payload};
    case REGISTER_USER:
      return {...state, userData: action.payload};
    default:
      return state;
  }
};
