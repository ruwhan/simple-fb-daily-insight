import {
  PROFILE_FETCH_FAIL,
  PROFILE_FETCH_LOADING,
  PROFILE_FETCH_SUCCESS
} from "../constants";
import { createReducer } from "./utils";

const initialState = {
  isLoading: false,
  isFetched: false,
  entities: {
    profile: {
      id: '',
      name: '',
      email: '',
      picture: {
        data: {
          width: 0,
          height: 0,
          url: '',
          is_silhouete: true,
          cache_key: "",
        }
      },
    }
  },
}

const profileFetching = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true
  });
}

const storeProfile = (state, action) => {
  const { payload } = action;
  const { data } = payload;
  
  return Object.assign({}, state, {
    isLoading: false,
    isFetched: true,
    entities: {
      profile: { ...data }
    }
  });
}

const profilesFetchFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
  });
}

export default createReducer(initialState, {
  [PROFILE_FETCH_LOADING]: profileFetching,
  [PROFILE_FETCH_SUCCESS]: storeProfile,
  [PROFILE_FETCH_FAIL]: profilesFetchFail,
});
