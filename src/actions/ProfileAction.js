import { api } from "../helper/apiConstant";
import { method } from "../helper/constants";
import { getToken, makeAPIRequest } from "../helper/globalFunction";
import {
  GET_IN_APP_PURCHASE,
  GET_PLAN_LIST,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  GET_ABOUT_US,
  GET_PRIVACY_POLICY
} from "./types";

// Get User Profile API
export const getUserProfile = (request) => async (dispatch) => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getProfile,
    data: request?.data,
    headers: myHeaders?.map,
  })
    .then((response) => {
      dispatch({ type: GET_USER_PROFILE, payload: response?.data?.data });
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};

//update User Profile

export const updateUserProfile = (request) => async (dispatch) => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.updateProfile,
    data: request?.data,
    headers: myHeaders?.map,
  })
    .then((response) => {
      dispatch({ type: UPDATE_USER_PROFILE, payload: response?.data });
      if (request.onSuccess) request.onSuccess(response?.data);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};

export const getPlanList = (request) => async (dispatch) => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getPlan,
    headers: myHeaders?.map,
  })
    .then((response) => {
      dispatch({ type: GET_PLAN_LIST, payload: response?.data?.data });
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};

export const getInAppPurchase = (request) => async (dispatch) => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getIAP,
    headers: myHeaders?.map,
    data: request?.data,
  })
    .then((response) => {
      dispatch({ type: GET_IN_APP_PURCHASE, payload: response?.data });
      if (request.onSuccess) request.onSuccess(response?.data);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};


export const getAboutUS = (request) => async (dispatch) => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getAboutUS,
    headers: myHeaders?.map,
  })
    .then((response) => {
      dispatch({ type: GET_ABOUT_US, payload: response?.data?.data });
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};


export const getPrivacyPolicy = (request) => async (dispatch) => {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  return makeAPIRequest({
    method: method.post,
    url: api.getPrivacyPolicy,
    headers: myHeaders?.map,
  })
    .then((response) => {
      dispatch({ type: GET_PRIVACY_POLICY, payload: response?.data?.data });
      if (request.onSuccess) request.onSuccess(response?.data?.data);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};

