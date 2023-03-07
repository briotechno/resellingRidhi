import { api } from "../helper/apiConstant";
import { method } from "../helper/constants";
import { getToken, makeAPIRequest } from "../helper/globalFunction";
import { FORGOT_PASSWORD, LOGIN_USER, REGISTER_USER } from "./types";

// Login API
export const loginUser = (request) => async (dispatch) => {
  return makeAPIRequest({
    method: method.post,
    url: api.login,
    data: request?.data,
  })
    .then((response) => {
      dispatch({ type: LOGIN_USER, payload: response?.data });
      if (request.onSuccess) request.onSuccess(response);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};

// Register API
export const registerUser = (request) => async (dispatch) => {
  return makeAPIRequest({
    method: method.post,
    url: api.register,
    data: request?.data,
  })
    .then((response) => {
      dispatch({ type: REGISTER_USER, payload: response?.data });
      if (request.onSuccess) request.onSuccess(response);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};

// Forgot Password API
export const forgotPwd = (request) => async (dispatch) => {
  return makeAPIRequest({
    method: method.post,
    url: api.forgotPwd,
    data: request?.data,
  })
    .then((response) => {
      dispatch({ type: FORGOT_PASSWORD, payload: response?.data });
      if (request.onSuccess) request.onSuccess(response);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};

// Logout User API
export const logoutUser = (request) => async (dispatch) => {
  return makeAPIRequest({
    method: method.post,
    url: api.logout,
    data: request?.data,
  })
    .then((response) => {
      if (request.onSuccess) request.onSuccess(response);
    })
    .catch((err) => {
      if (request.onFail) request.onFail(err);
    });
};
