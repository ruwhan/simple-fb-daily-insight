import {
  CAMPAIGN_FETCH_FAIL,
  CAMPAIGN_FETCH_LOADING,
  CAMPAIGN_FETCH_SUCCESS,
  CAMPAIGN_SELECT
} from "../constants";
import CampaignsService from "../services/CampaignsService";
import { loadInsights } from "./insights";

export const campaignsFetchLoading = () => ({
  type: CAMPAIGN_FETCH_LOADING
});

export const campaignsFetchSuccess = (data, paging) => ({
  type: CAMPAIGN_FETCH_SUCCESS,
  payload: { data, paging }
});

export const campaignsFetchFail = () => ({
  type: CAMPAIGN_FETCH_FAIL
});

export const campaignSelect = (campaign) => ({
  type: CAMPAIGN_SELECT,
  payload: { campaignId: campaign.id }
});

export const loadCampaigns = () => {
  return async (dispatch, getState) => {
    const { auth, adAccounts } = getState();
    let res;
    dispatch(campaignsFetchLoading());
    
    try {
      res = await CampaignsService.get(adAccounts.selectedAdAccount, auth.accessToken);
      dispatch(campaignsFetchSuccess(res.data, res.paging));
    }
    catch (ex) {
      dispatch(campaignsFetchFail());
      console.error(ex);
    }
  }
}

export const selectCampaign = (campaign) => {
  return async (dispatch, getState) => {
    dispatch(campaignSelect(campaign));
    await dispatch(loadInsights());
  }
}

export const loadNextCampaigns = () => {
  return async (dispatch, getState) => {
    const { auth, adAccounts, campaigns } = getState();
    const { paging } = campaigns;
    const { cursors } = paging;
    let res;

    if (campaigns.isLoading) {
      return;
    }

    dispatch(campaignsFetchLoading());

    try {
      res = await CampaignsService.getNext(
        adAccounts.selectedAdAccount,
        auth.accessToken,
        cursors.after);
      dispatch(campaignsFetchSuccess(res.data, res.paging));
    }
    catch (ex) {
      dispatch(campaignsFetchFail());
      console.error(ex);
    }
  }
}
