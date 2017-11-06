const $clientId = '_RfjE6uLZ2cNMDWCINOEDQ';
const $secret = 'wlN5yJXvRuQg3I4uVOLWh1cguuOkVUTMcYBWjcVeKjvT1yX4yYLuVaUA0A07UsNh';
let accessToken = '';

let Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch('https://cors-anywhere.herokuapp.com/' + 'https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id='+ $clientId + '&client_secret='+ $secret, {method: 'PUT'}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },
  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {return fetch('https://cors-anywhere.herokuapp.com/' + 'https://api.yelp.com/v3/businesses/search?term=' + term + '&location=' + location + '&sort_by=' + sortBy, {headers: {Authorization: `Bearer ${accessToken}`}});}).then(jsonResponse => {
      if(jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address,
          city: business.location.city,
          state: business.location.state_code,
          zipCode: business.location.postal_code,
          category: business.categories,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
}
export default Yelp;
