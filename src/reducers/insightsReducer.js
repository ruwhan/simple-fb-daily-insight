import {
  INSIGHT_FETCH_FAIL,
  INSIGHT_FETCH_LOADING,
  INSIGHT_FETCH_SUCCESS
} from "../constants";
import { createReducer } from "./utils";

const initialState = {
  isLoading: false,
  isFetched: false,
  isLoadingBrokenDown: false,
  isFetchedBrokenDown: false,
  entities: {
    data: [],
    brokenDownsData: [],
  },
  paging: {
    cursors: {}
  },
  parameters: {
    // fields: undefined,
    timeRange: undefined,
    timeIncrement: 1,
    breakdowns: ''
  }
}

const insightsFetching = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true
  });
}

const storeSelectedInsights = (state, action) => {
  const { payload } = action;
  const { data } = payload;
  
  return Object.assign({}, state, {
    isLoading: false,
    isFetched: true,
    entities: {
      data: [...data]
    }
  });
}

const insightsFetchFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
  });
}

export default createReducer(initialState, {
  [INSIGHT_FETCH_LOADING]: insightsFetching,
  [INSIGHT_FETCH_SUCCESS]: storeSelectedInsights,
  [INSIGHT_FETCH_FAIL]: insightsFetchFail
});
