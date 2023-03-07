import {
  GET_NEWS_LIST,
  GET_ANALYTICS_LIST,
  GET_COUPANS_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  // Initial state list
  newsList: null,
  analyticsList: null,
  coupansList: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NEWS_LIST:
      return {...state, newsList: action.payload};
    case GET_ANALYTICS_LIST:
      return {...state, analyticsList: action.payload};
    case GET_COUPANS_LIST:
      return {...state, coupansList: action.payload};
    default:
      return state;
  }
};
