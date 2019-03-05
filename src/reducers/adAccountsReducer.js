import {
  ACCOUNT_FETCH_FAIL,
  ACCOUNT_FETCH_LOADING,
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_SELECT,
} from "../constants";
import { createReducer } from "./utils";

const initialState = {
  isLoading: false,
  isFetched: false,
  selectedAdAccount: '',
  entities: {
    byId: {},
    ids: [],
  }
}

const accountFetching = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true,
  });
}

const storeAccounts = (state, action) => {
  const { payload } = action;
  const { data } = payload;
  let byId = {}; 
  let ids = [];

  data.forEach((item) => {
    byId[item.id] = item;
  });

  ids = data.map((item) => item.id);

  return Object.assign({}, state, {
    entities: {
      byId,
      ids,
    },
    isLoading: false,
    isFetched: true,
  });
}

const accountFetchFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
  });
}

const setSelectedAdAccount = (state, action) => {
  const { payload } = action;
  const { adAccountId } = payload;

  return Object.assign({}, state, {
    selectedAdAccount: adAccountId,
  });
}

export default createReducer(initialState, {
  [ACCOUNT_FETCH_LOADING]: accountFetching,
  [ACCOUNT_FETCH_SUCCESS]: storeAccounts,
  [ACCOUNT_FETCH_FAIL]: accountFetchFail,
  [ACCOUNT_SELECT]: setSelectedAdAccount,
})
