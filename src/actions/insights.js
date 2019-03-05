import {
  INSIGHT_FETCH_FAIL,
  INSIGHT_FETCH_LOADING,
  INSIGHT_FETCH_SUCCESS
} from "../constants";
import { loadBrokenDownInsights } from "./insightBreakDown";
import InsightsService from "../services/InsightsService";

export const insightsFetchLoading = () => ({
  type: INSIGHT_FETCH_LOADING
})

export const insightsFetchSuccess = ({ data }) => ({
  type: INSIGHT_FETCH_SUCCESS,
  payload: { data }
})

export const insightsFetchFail = () => ({
  type: INSIGHT_FETCH_FAIL
})

export const loadInsights = () => {
  return async (dispatch, getState) => {
    const { auth, campaigns } = getState();
    let res;
    dispatch(insightsFetchLoading());

    try {
      res = await InsightsService.get(campaigns.selectedCampaigns[0], auth.accessToken);
      dispatch(insightsFetchSuccess(res));
      dispatch(loadBrokenDownInsights());
    }
    catch (err) {
      dispatch(insightsFetchFail());
      console.error(err);
    }
  }
}

// export const loadInsightByDay = () => {
//   return async (dispatch, getState) => {
//     const { auth, campaigns } = getState();
//     const { selectedAdCampaigns } = campaigns;
//     const selectedAdCampaignsObj = byId[selectedAdCampaigns];
//     let fields =  `
//       date_start,
//       date_stop,
//       impressions,
//       account_id,campaign_id,clicks,cost_per_10_sec_video_view,cost_per_action_type,cost_per_estimated_ad_recallers,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_outbound_click,cost_per_thruplay,cost_per_unique_action_type,cost_per_unique_click,cost_per_unique_inline_link_click,cost_per_unique_outbound_click,cpc,cpm,cpp,ctr,frequency,inline_link_click_ctr,inline_link_clicks,inline_post_engagement,mobile_app_purchase_roas,outbound_clicks,outbound_clicks_ctr,reach,relevance_score,social_spend,spend,unique_actions,unique_clicks,unique_ctr,unique_inline_link_click_ctr,unique_inline_link_clicks,unique_link_clicks_ctr,unique_outbound_clicks,unique_outbound_clicks_ctr,video_10_sec_watched_actions,video_30_sec_watched_actions,video_avg_percent_watched_actions,video_avg_time_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,video_play_actions,video_thruplay_watched_actions,website_ctr,website_purchase_roas`;
//   }
// }
