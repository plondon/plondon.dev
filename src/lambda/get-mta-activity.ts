import * as Mta from 'mta-gtfs';
require('dotenv').config();

exports.handler = () => {
  var mta = new Mta({
    key: process.env.REACT_APP_MTA_TOKEN, // only needed for mta.schedule() method
    feed_id: 1 // optional, default = 1
  });

  return mta
    .status()
    .then(data => ({
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200
    }))
    .catch(error => {
      console.log(error);
      return { body: String(error), statusCode: 422 };
    });
};
