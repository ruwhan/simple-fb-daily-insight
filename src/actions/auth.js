import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS } from "../constants";
import { loadProfiles } from "./profiles";
import FbLogin from "../libs/FbLogin";
// import SimpleStore from "../libs/SimpleStore";

export const loginLoading = () => {
  return {
    type: LOGIN_LOADING
  }
}

export const loginSuccess = (authResponse) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { authResponse }
  }
}

export const loginFail = () => {
  return {
    type: LOGIN_FAIL
  }
}

export const login = () => {
  return async (dispatch, getState) => {
    dispatch(loginLoading());
    try {
      const res = await FbLogin.login();
      dispatch(loginSuccess(res));
    }
    catch (ex) {
      dispatch(loginFail());
      console.error(ex);
    }
  }
}

export const getLoginStatus = () => {
  return async (dispatch, getState) => {
    try {
      // TODO: re-auth when error code equals 190 or error_subcode equals 463
      let res, expirationTime; //, simpleStore;
      dispatch(loginLoading());
      res = await FbLogin.getLoginStatus();
      dispatch(loginSuccess(res));

      // get expiration time
      expirationTime = new Date().getTime() + ((res.authResponse.expiresIn) * 1000);
      localStorage.setItem('expiresIn', new Date(expirationTime).toISOString());

      setTimeout(() => {
        dispatch(getLoginStatus());
      }, (res.authResponse.expiresIn - 60) * 1000);

      // simpleStore = SimpleStore.factory();
      // SimpleStore.setItem('expiresIn', new Date(expirationTime).toISOString());
      dispatch(loadProfiles());
    }
    catch (ex) {
      dispatch(loginFail());
      console.error(ex);
    }
  }
}
