import {
  PROFILE_FETCH_FAIL,
  PROFILE_FETCH_LOADING,
  PROFILE_FETCH_SUCCESS
} from "../constants";
import ProfilesService from "../services/ProfilesService";

export const profileFetchLoading = () => ({
  type: PROFILE_FETCH_LOADING
});

export const profileFetchSuccess = (data = {}) => ({
  type: PROFILE_FETCH_SUCCESS,
  payload: { data }
});

export const profileFetchFail = () => ({
  type: PROFILE_FETCH_FAIL
});

export const loadProfiles = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    dispatch(profileFetchLoading());

    try {
      const res = await ProfilesService.get(auth.accessToken);
      dispatch(profileFetchSuccess(res));
    }
    catch(ex) {
      dispatch(profileFetchFail());
      console.error(ex);
    }
  }
}
