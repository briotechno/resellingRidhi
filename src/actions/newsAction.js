import {api} from '../helper/apiConstant';
import {method} from '../helper/constants';
import {getToken, makeAPIRequest} from '../helper/globalFunction';
import {
  GET_NEWS_LIST,
  GET_ANALYTICS_LIST,
  GET_COUPANS_LIST,
} from './types';

// Get newsList API
export const getNewsList = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getNewsList,
    headers: myHeaders?.map,
  })
    .then(response => {
      dispatch({type: GET_NEWS_LIST, payload: response?.data?.data});
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const getAnalyticsList = request => async dispatch => {
    const token = await getToken();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    return makeAPIRequest({
      method: method.post,
      url: api.getAnalyticsList,
      headers: myHeaders?.map,
    })
      .then(response => {
        dispatch({type: GET_ANALYTICS_LIST, payload: response?.data?.data});
        if (request.onSuccess) request.onSuccess(response?.data?.data);
      })
      .catch(err => {
        if (request.onFail) request.onFail(err);
      });
  };

  export const getcouponsList = request => async dispatch => {
    const token = await getToken();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    return makeAPIRequest({
      method: method.post,
      url: api.getCoupansList,
      headers: myHeaders?.map,
    })
      .then(response => {
        dispatch({type: GET_COUPANS_LIST, payload: response?.data?.data});
        if (request.onSuccess) request.onSuccess(response?.data?.data);
      })
      .catch(err => {
        if (request.onFail) request.onFail(err);
      });
  };