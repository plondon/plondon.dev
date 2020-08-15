import * as Mta from 'mta-gtfs';
require('dotenv').config();

exports.handler = () => {
  var mta = new Mta({
    key: process.env.REACT_APP_MTA_TOKEN, // only needed for mta.schedule() method
    feed_id: 1 // optional, default = 1
  });

  return mta.status().then(function(result) {
    return result;
  }).catch(e => e);
};
