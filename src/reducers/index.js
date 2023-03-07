import {combineReducers} from 'redux';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import profileReducer from './profileReducer';
import offerReducer from './offerReducer';
const rootReducer = combineReducers({
  // Reducer list
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  offer: offerReducer,
});

export default rootReducer;
