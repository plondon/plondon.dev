import axios from 'axios';
require('dotenv').config();

exports.handler = () => {
  return axios({
    data: {
      client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
      client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
      code: process.env.REACT_APP_STRAVA_APP_CODE,
      grant_type: 'authorization_code'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    method: 'POST',
    url: `https://www.strava.com/api/v3/oauth/token`
  })
    .then(res => res.data)
    .then(data => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + data.access_token
        },
        method: 'GET',
        url: 'https://www.strava.com/api/v3/athlete/activities?per_page=5'
      })
        .then(res => res.data)
        .then(data => ({
          body: JSON.stringify(data),
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          statusCode: 200
        }))
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
      return { body: String(error), statusCode: 422 };
    });
};
