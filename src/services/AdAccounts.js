import "whatwg-fetch"

class AdAccounts {
  /**
   * Get ad account list, static method.
   * 
   * @param {String}  accessToken
   * @param {String}  fields
   * @return {Promise}
   */
  static get = async (
    accessToken, 
    fields = 'name,account_id,business_name,amount_spent,currency'
  ) => {
    const url = new URL('https://graph.facebook.com/v3.1/me/adaccounts');
    let res, json;
    url.searchParams.append('fields',fields);
    url.searchParams.append('access_token', accessToken);
    res = await fetch(url);
    json = await res.json();
    return json;
  }
}

export default AdAccounts
