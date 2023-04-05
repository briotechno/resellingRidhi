import {api} from '../helper/apiConstant';
import {method} from '../helper/constants';
import {getToken, makeAPIRequest} from '../helper/globalFunction';
import {
  GET_BRAND_LIST,
  GET_SHOP_LIST,
  GET_OFFER_LIST,
  GET_EMOJI_RATE,
  GET_CATEGORY_BRAND,
  GET_FILTER,
} from './types';

// Get brandlist API
export const getBrandList = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getBrandList,
    headers: myHeaders?.map,
  })
    .then(response => {
      dispatch({type: GET_BRAND_LIST, payload: response?.data?.data});
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

//get shop list

export const getShopList = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getShopList,
    headers: myHeaders?.map,
  })
    .then(response => {
      dispatch({type: GET_SHOP_LIST, payload: response?.data?.data});
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const getOfferList = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    data: request?.data,
    url: api.getOfferList,
    headers: myHeaders?.map,
  })
    .then(response => {
      dispatch({type: GET_OFFER_LIST, payload: response?.data?.data});
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const getEmojiOffer = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getEmojiOffer,
    headers: myHeaders?.map,
    data: request?.data,
  })
    .then(response => {
      if (request.onSuccess) request.onSuccess(response?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const getEmojiRate = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getemojirate,
    headers: myHeaders?.map,
    data: request?.data,
  })
    .then(response => {
      dispatch({type: GET_EMOJI_RATE, payload: response?.data});
      if (request.onSuccess) request.onSuccess(response?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const getCategoryWithBrand = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.get,
    url: api.getCategorywithBrand,
    headers: myHeaders?.map,
  })
    .then(response => {
      dispatch({type: GET_CATEGORY_BRAND, payload: response?.data?.data});
      if (request.onSuccess) request.onSuccess(response?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

//filter api
export const getFilter = request => async dispatch => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    data: request?.data,
    url: api.getfilter,
    headers: myHeaders?.map,
  })
    .then(response => {
      dispatch({type: GET_FILTER, payload: response?.data});
      if (request.onSuccess) request.onSuccess(response?.data);
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};