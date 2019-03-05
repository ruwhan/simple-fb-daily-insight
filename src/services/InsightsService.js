// 6108498261316/insights?fields=date_start,date_stop,impressions,account_id,campaign_id,clicks,cost_per_10_sec_video_view,cost_per_action_type,cost_per_estimated_ad_recallers,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_outbound_click,cost_per_thruplay,cost_per_unique_action_type,cost_per_unique_click,cost_per_unique_inline_link_click,cost_per_unique_outbound_click,cpc,cpm,cpp,ctr,frequency,inline_link_click_ctr,inline_link_clicks,inline_post_engagement,mobile_app_purchase_roas,outbound_clicks,outbound_clicks_ctr,reach,relevance_score,social_spend,spend,unique_actions,unique_clicks,unique_ctr,unique_inline_link_click_ctr,unique_inline_link_clicks,unique_link_clicks_ctr,unique_outbound_clicks,unique_outbound_clicks_ctr,video_10_sec_watched_actions,video_30_sec_watched_actions,video_avg_percent_watched_actions,video_avg_time_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,video_play_actions,video_thruplay_watched_actions,website_ctr,website_purchase_roas&date_preset=lifetime
import "whatwg-fetch";

const FACEBOOK_HOST = 'https://graph.facebook.com';
const FACEBOOK_API_VERSION = 'v3.1';
const allFields = `date_start,date_stop,impressions,account_id,campaign_id,clicks,cost_per_10_sec_video_view,cost_per_action_type,cost_per_estimated_ad_recallers,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_outbound_click,cost_per_thruplay,cost_per_unique_action_type,cost_per_unique_click,cost_per_unique_inline_link_click,cost_per_unique_outbound_click,cpc,cpm,cpp,ctr,frequency,inline_link_click_ctr,inline_link_clicks,inline_post_engagement,mobile_app_purchase_roas,outbound_clicks,outbound_clicks_ctr,reach,relevance_score,social_spend,spend,unique_actions,unique_clicks,unique_ctr,unique_inline_link_click_ctr,unique_inline_link_clicks,unique_link_clicks_ctr,unique_outbound_clicks,unique_outbound_clicks_ctr,video_10_sec_watched_actions,video_30_sec_watched_actions,video_avg_percent_watched_actions,video_avg_time_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,video_play_actions,video_thruplay_watched_actions,website_ctr,website_purchase_roas`;

class InsightsService {
  static get = async (
    campaignId,
    authToken,
    fields=allFields,
    datePreset='lifetime',
    breakdowns=''
  ) => {
    const url = new URL(`${FACEBOOK_HOST}/${FACEBOOK_API_VERSION}/${campaignId}/insights`);
    let res, json;

    url.searchParams.append('access_token', authToken);
    url.searchParams.append('fields', fields);
    url.searchParams.append('date_preset', datePreset);
    url.searchParams.append('breakdowns', breakdowns);

    res = await fetch(url);
    json = await res.json();

    return json;
  }

  static getMore = async (next) => {
    const url = new URL(next);
    let res, json;

    res = await fetch(url);
    json = await res.json();

    return json;
  }

  static getWithTimeRange = async (
    campaignId,
    authToken,
    timeRange,
    timeIncrement,
    breakdowns = '',
    fields = allFields
  ) => {
    const url = new URL(`${FACEBOOK_HOST}/${FACEBOOK_API_VERSION}/${campaignId}/insights`);
    let res, json;

    url.searchParams.append('access_token', authToken);
    url.searchParams.append('fields', fields);
    // url.searchParams.append('date_preset', datePreset);
    url.searchParams.append('time_range', `{'since':'${timeRange.since}','until':'${timeRange.until}'}`);
    url.searchParams.append('time_increment', timeIncrement);
    url.searchParams.append('breakdowns', breakdowns);

    res = await fetch(url);
    json = await res.json();

    return json;
  }
}

export default InsightsService;
