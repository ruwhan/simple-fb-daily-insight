import "whatwg-fetch";

class ProfilesService {
  static get = async (
    accessToken,
    fields="id,name,email,picture{width,height,url,is_silhouette,cache_key}"
  ) => {
    const url = new URL('https://graph.facebook.com/v3.1/me');
    let res, json;

    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('fields', fields);

    res = await fetch(url);
    json = await res.json();

    return json;
  }
}

export default ProfilesService;
