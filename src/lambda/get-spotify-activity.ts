import axios from 'axios';
require('dotenv').config();

exports.handler = () => {
  return axios({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    params: {
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN
    },
    url: `https://accounts.spotify.com/api/token`
  })
    .then(res => res.data)
    .then(data => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + data.access_token
        },
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/currently-playing'
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
