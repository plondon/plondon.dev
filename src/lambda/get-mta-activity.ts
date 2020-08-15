import MTA from 'js-mta/build/index';
require('dotenv').config();

exports.handler = () => {
  var mta = new MTA('123');

  return mta
    .stops()
    .then(stops => {
      return {
        body: JSON.stringify(stops),
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200
      };
    })
    .catch(error => {
      console.log(error);
      return { body: String(error), statusCode: 422 };
    });
};
