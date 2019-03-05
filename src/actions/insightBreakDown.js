import {
  INSIGHT_BREAKDOWN_CHANGE_FIELD,
  INSIGHT_BREAKDOWN_CHANGE_TIME_INCREMENT,
  INSIGHT_BREAKDOWN_FETCH_FAIL,
  INSIGHT_BREAKDOWN_FETCH_LOADING,
  INSIGHT_BREAKDOWN_FETCH_MORE_SUCCESS,
  INSIGHT_BREAKDOWN_FETCH_SUCCESS,
} from "../constants";
import InsightsService from "../services/InsightsService";

export const insightBreakDownFetchLoading = () => ({
  type: INSIGHT_BREAKDOWN_FETCH_LOADING
})

export const insightBreakDownFetchSuccess = ({ data, paging }) => ({
  type: INSIGHT_BREAKDOWN_FETCH_SUCCESS,
  payload: { data, paging }
})

export const insightBreakDownFetchFail = () => ({
  type: INSIGHT_BREAKDOWN_FETCH_FAIL
})

export const insightBreakDownTimeIncrementChange = (timeIncrement) => ({
  type: INSIGHT_BREAKDOWN_CHANGE_TIME_INCREMENT,
  payload: { timeIncrement }
})

export const insightBreakDownMoreSuccess = ({ data, paging }) => ({
  type: INSIGHT_BREAKDOWN_FETCH_MORE_SUCCESS,
  payload: { data, paging }
})

export const insightBreakDownChangeField = ({ selectedField }) => ({
  type: INSIGHT_BREAKDOWN_CHANGE_FIELD,
  payload: { selectedField }
})

export const loadBrokenDownInsights = () => {
  return async (dispatch, getState) => {
    const { auth, campaigns, insights, insightBreakDown } = getState();
    const { parameters } = insightBreakDown;
    let res;
    
    if (insights.entities.data.length === 0) {
      throw new Error("No insight for this entity!");
    }

    dispatch(insightBreakDownFetchLoading());

    try {
      res = await InsightsService.getWithTimeRange(
        campaigns.selectedCampaigns[0],
        auth.accessToken,
        { since: insights.entities.data[0].date_start, until: insights.entities.data[0].date_stop },
        parameters.timeIncrement
      );
      dispatch(insightBreakDownFetchSuccess(res));
    }
    catch (err) {
      dispatch(insightBreakDownFetchFail());
      console.error(err);
    }
  }
}

export const changeTimeIncrement = (timeIncrement) => {
  return (dispatch, getState) => {
    dispatch(insightBreakDownTimeIncrementChange(timeIncrement));
    dispatch(loadBrokenDownInsights());
  }
}

export const loadMoreBrokenDownInsight = () => {
  return async (dispatch, getState) => {
    const { insightBreakDown } = getState();
    const { paging } = insightBreakDown;
    let res;

    try {
      res = await InsightsService.getMore(paging.next);
      dispatch(insightBreakDownMoreSuccess(res));
    } catch (ex) {
      console.error(ex);
    }
  }
}

export const createNewVisual = (visualProperties) => {
  return async (dispatch, getState) => {

  }
}
