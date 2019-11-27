import axios from 'axios';
require('dotenv').config();

exports.handler = () => {
  return axios({
    headers: {
      Authorization: 'Bearer ' + process.env.REACT_APP_TWITTER_AUTH_TOKEN
    },
    method: 'GET',
    url: `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=plondon514&count=5`
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
      return { body: String(error), statusCode: 422 };
    });
};
