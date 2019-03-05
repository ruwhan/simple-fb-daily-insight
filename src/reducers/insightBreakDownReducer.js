import {
  INSIGHT_BREAKDOWN_CHANGE_FIELD,
  INSIGHT_BREAKDOWN_CHANGE_TIME_INCREMENT,
  INSIGHT_BREAKDOWN_FETCH_FAIL,
  INSIGHT_BREAKDOWN_FETCH_LOADING,
  INSIGHT_BREAKDOWN_FETCH_MORE_SUCCESS,
  INSIGHT_BREAKDOWN_FETCH_SUCCESS,
} from "../constants";
import { createReducer } from "./utils";

const initialState = {
  isLoading: false,
  isFetched: false,
  entities: {
    data: [],
    byDateRange: [],
  },
  paging: {
    cursors: {}
  },
  parameters: {
    // fields: undefined,
    timeRange: undefined,
    timeIncrement: '1', //'all_days',
    breakdowns: ''
  },
  selectedField: 'impressions'
}

const brokenDownInsightFetching = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true
  });
}

const storeBrokenDownInsights = (state, action) => {
  const { payload } = action;

  return Object.assign({}, state, {
    isLoading: false,
    isFetched: true,
    paging: { ...payload.paging },
    entities: {
      data: [...payload.data],
      byDateRange: [...payload.data]
    },
  });
}

const pushBrokenDownInsight = (state, action) => {
  const { payload } = action;
  const { entities } = state;

  return Object.assign({}, state, {
    paging: { ...payload.paging },
    entities: {
      data: entities.data.concat(payload.data),
      byDateRange: entities.byDateRange.concat(payload.data)
    },
  });
}

const brokenDownInsightFetchFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false
  });
}

const brokenDownInsightChangeParameters = (state, action) => {
  const { payload } = action;
  const { parameters } = state;

  return Object.assign({}, state, {
    parameters: {
      ...parameters,
      timeIncrement: payload.timeIncrement
    }
  });
}

const brokenDownInsightChangeField = (state, action) => {
  const { payload } = action;

  return Object.assign({}, state, {
    selectedField: payload.selectedField,
  });
}

export default createReducer(initialState, {
  [INSIGHT_BREAKDOWN_FETCH_LOADING]: brokenDownInsightFetching,
  [INSIGHT_BREAKDOWN_FETCH_SUCCESS]: storeBrokenDownInsights,
  [INSIGHT_BREAKDOWN_FETCH_FAIL]: brokenDownInsightFetchFail,
  [INSIGHT_BREAKDOWN_CHANGE_TIME_INCREMENT]: brokenDownInsightChangeParameters,
  [INSIGHT_BREAKDOWN_FETCH_MORE_SUCCESS]: pushBrokenDownInsight,
  [INSIGHT_BREAKDOWN_CHANGE_FIELD]: brokenDownInsightChangeField,
});
