import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS } from "../constants";
import { createReducer } from "./utils";

const initialState = {
  status: 'unknown',
  accessToken: '',
  expiresIn: 0,
  reauthorizeRequiredIn: '',
  signedRequest: '',
  userId: '',
  isLoading: false,
}

const loggingIn = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true
  });
}

const loggedIn = (state, action) => {
  const { payload } = action;
  const { status, authResponse } = payload.authResponse;

  return Object.assign({}, state, {
    isLoading: false,
    status,
    ...authResponse,
  });
}

const loginFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false
  });
}

export default createReducer(initialState, {
  [LOGIN_LOADING]: loggingIn,
  [LOGIN_SUCCESS]: loggedIn,
  [LOGIN_FAIL]: loginFail,
});
