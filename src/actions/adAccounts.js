import {
  ACCOUNT_FETCH_FAIL,
  ACCOUNT_FETCH_LOADING,
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_SELECT,
} from "../constants";
import AdAccounts from "../services/AdAccounts";
import { loadCampaigns } from "./campaigns";

export const adAccountsFetchLoading = () => ({
  type: ACCOUNT_FETCH_LOADING
});

export const adAccountsFetchSuccess = (data = []) => ({
  type: ACCOUNT_FETCH_SUCCESS,
  payload: { data }
});

export const adAccountsFetchFail = () => ({
  type: ACCOUNT_FETCH_FAIL
});

export const adAccountsSelect = (adAccountId) => ({
  type: ACCOUNT_SELECT,
  payload: { adAccountId }
})

export const loadAdAccounts = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    let timeoutId;

    dispatch(adAccountsFetchLoading());
    timeoutId = setTimeout(async () => {
      if (!auth.accessToken || auth.isLoading) {
        dispatch(loadAdAccounts());
        return;
      }

      try {
        clearTimeout(timeoutId);
        const res = await AdAccounts.get(auth.accessToken);
        dispatch(adAccountsFetchSuccess(res.data));
      }
      catch(ex) {
        dispatch(adAccountsFetchFail());
        console.error(ex);
      }
    }, 200);
  }
}

export const selectAdAccount = (adAccountId) => {
  return async(dispatch, getState) => {
    dispatch(adAccountsSelect(adAccountId));
    await dispatch(loadCampaigns());
  }
}
