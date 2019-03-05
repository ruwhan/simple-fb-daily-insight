class FbLogin {
  /**
   * Login with Facebook, static method.
   * 
   * @return  {Promise}
   */
  static login = () => {
    const p = new Promise((resolve, reject) => {
      FB.login( // eslint-disable-line no-undef
        (response) => {
          if (response.status === 'connected') {
            resolve(response);
          }
          else {
            reject(response);
          }
        },
        {
          scope: `email,ads_read,business_management,manage_pages,pages_show_list,
            publish_pages,read_insights`,
        }
      )
    });

    return p;
  }

  /**
   * Get Facebook login status, static method.
   * 
   * @return  {Promise}
   */
  static getLoginStatus = () => {
    const p = new Promise((resolve, reject) => {
      FB.getLoginStatus(function(response) { // eslint-disable-line no-undef
        if (response.status === 'connected') {
          resolve(response);
        }
        else {
          reject(response);
        }
      });
    });

    return p;
  }
}

export default FbLogin;
