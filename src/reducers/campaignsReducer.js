import {
  CAMPAIGN_FETCH_FAIL,
  CAMPAIGN_FETCH_LOADING,
  CAMPAIGN_FETCH_SUCCESS,
  CAMPAIGN_SELECT
} from "../constants";
import { createReducer } from "./utils";

const initialState = {
  isLoading: false,
  isFetched: false,
  selectedCampaigns: [''],
  entities: {
    byId: {},
    ids: [],
    raw: [],
    // insights
  },
  paging: {
    cursors: {}
  }
}

const campaignsFetching = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true
  });
}

const storeCampaigns = (state, action) => {
  const { payload } = action;
  const { data, paging } = payload;
  const { entities } = state;

  if (data && data.length === 0) {
    return state;
  }

  let byId = {},
    ids = [],
    raw = entities.raw.concat(data.slice(0)), incomingIds = [];

  incomingIds = data.map((item) => item.id);
  data.forEach((item) => {
    byId[item.id] = item;
  });
  byId = Object.assign({}, entities.byId, { ...byId });
  ids = entities.ids.concat(incomingIds);

  return Object.assign({}, state, {
    isLoading: false,
    isFetched: true,
    entities: {
      ids,
      byId,
      raw,
    },
    paging: { 
      cursors: {
        ...paging.cursors
      }
    }
  });
}

const campaignsFetchFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
    isFetched: true,
  });
}

const campaignSelect = (state, action) => {
  // const { selectedCampaigns } = state;
  const { payload } = action;
  const { campaignId } = payload;
  // const indexFound = selectedCampaigns.indexOf((item) => item === campaignId);

  // if (indexFound >= 0) {
  //   selectedCampaigns.splice(indexFound, 1);
  //   return Object.assign({}, state, {
  //     selectedCampaigns: [
  //       [...selectedCampaigns].splice(indexFound, 1)
  //     ]
  //   });
  // }

  // return Object.assign({}, state, {
  //   selectedCampaigns: [
  //     [...selectedCampaigns].add(campaignId)
  //   ]
  // });

  return Object.assign({}, state, {
    selectedCampaigns: [ campaignId ]
  });
}

export default createReducer(initialState, {
  [CAMPAIGN_FETCH_LOADING]: campaignsFetching,
  [CAMPAIGN_FETCH_SUCCESS]: storeCampaigns,
  [CAMPAIGN_FETCH_FAIL]: campaignsFetchFail,
  [CAMPAIGN_SELECT]: campaignSelect,
});
