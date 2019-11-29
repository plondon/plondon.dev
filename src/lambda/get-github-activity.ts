import axios from 'axios';

exports.handler = () => {
  return axios({
    method: 'GET',
    url: `https://api.github.com/users/plondon/events?per_page=5`
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
