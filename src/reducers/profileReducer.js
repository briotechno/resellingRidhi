import {
  GET_ABOUT_US,
  GET_IN_APP_PURCHASE,
  GET_PLAN_LIST,
  GET_PRIVACY_POLICY,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from '../actions/types';

const INITIAL_STATE = {
  // Initial state list
  userProfile: null,
  userUpdateProfile: null,
  planList: null,
  iapData: null,
  aboutusData: null,
  privacyData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {...state, userProfile: action.payload};
    case UPDATE_USER_PROFILE:
      return {...state, userUpdateProfile: action.payload};
    case GET_PLAN_LIST:
      return {...state, planList: action.payload};
    case GET_IN_APP_PURCHASE:
      return {...state, iapData: action.payload};
    case GET_ABOUT_US:
      return {...state, aboutusData: action.payload};
    case GET_PRIVACY_POLICY:
      return {...state, privacyData: action.payload};
    default:
      return state;
  }
};
