import "whatwg-fetch";

class CampaignsService {
  static get = async (
    adAccountId,
    accessToken,
    fields='id,account_id,name,status,effective_status,start_time,stop_time,objective') => {
    const url = new URL(`https://graph.facebook.com/v3.1/${adAccountId}/campaigns`);
    let res, json;
    
    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('fields', fields);

    res = await fetch(url);
    json = await res.json();
    
    return json;
  }

  static getNext = async (
    adAccountId,
    accessToken,
    after,
    fields='id,account_id,name,status,effective_status,start_time,stop_time,objective'
  ) => {
    const url = new URL(`https://graph.facebook.com/v3.1/${adAccountId}/campaigns`);
    let res, json;
    
    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('fields', fields);
    url.searchParams.append('after', after);

    res = await fetch(url);
    json = await res.json();
    
    return json;
  }
}

export default CampaignsService;
