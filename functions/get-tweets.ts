import axios from 'axios';
const { TWITTER_AUTH_TOKEN } = process.env;

exports.handler = () => {
  return axios({
    headers: {
      authorization: 'Bearer ' + TWITTER_AUTH_TOKEN
    },
    method: 'GET',
    url:
      'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=plondon514'
  }).then(res => res.data);
};
