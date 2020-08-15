import * as Mta from 'mta-gtfs';

exports.handler = () => {
  var mta = new Mta({
    key: process.env.REACT_APP_MTA_TOKEN, // only needed for mta.schedule() method
    feed_id: 1 // optional, default = 1
  });

  mta.status().then(function(result: any) {
    return result;
  });
};
