import {api} from '../helper/apiConstant';
import {method} from '../helper/constants';
import {getToken, makeAPIRequest} from '../helper/globalFunction';
import {GET_DASHBOARD} from './types';

// Get User Profile API
export const getDashboard = request => async dispatch => {
  console.log('request', request);
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getDashboard,
    headers: myHeaders?.map,
    params: request?.params,
  })
    .then(response => {
      dispatch({type: GET_DASHBOARD, payload: response?.data?.data});
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};
