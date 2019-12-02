import * as L from 'leaflet';
import * as PolylineEncoded from 'polyline-encoded';
import { Header3 } from './Components';
import ActivityStatus from './ActivityStatus';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

interface Props {}

interface StravaActivity {
  start_date: string;
  start_latlng: Array<number>;
  end_latlng: Array<number>;
  map: {
    summary_polyline: string;
  };
}

interface StravaResponse extends AxiosResponse {
  data: Array<StravaActivity>;
}

const Container = styled.div``;
const CustomHeader = styled(Header3)`
  display: flex;
  height: 1.75rem;
`;
const Item = styled.div`
  font-size: 0.8rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
`;

const average = (x: number, y: number, z: number) => {
  return (x + y + z) / 3;
};

const calcCenter = (activity: StravaActivity) => {
  const LatLng = PolylineEncoded.decode(activity.map.summary_polyline);
  const start = LatLng[0];
  const middle = LatLng[Math.floor(LatLng.length / 2)];
  const end = LatLng[LatLng.length - 1];

  return [
    average(start[0], middle[0], end[0]),
    average(start[1], middle[1], end[1])
  ];
};

export const Strava: React.FC<Props> = () => {
  const [transition, setTransition] = useState('NONE');
  const [stravaActivity, setStravaActivity] = useState<Array<StravaActivity>>(
    []
  );

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/.netlify/functions/get-strava-activity`
      )
      .then((res: StravaResponse) => {
        setStravaActivity(res.data);
        const activity = res.data[0];
        const myMap = L.map('mapid').setView(calcCenter(activity), 13.5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
        L.mapboxGL({
          accessToken: 'not-needed',
          attribution: ' ',
          style:
            'https://api.maptiler.com/maps/204b2510-7a5f-4ef3-9f66-792fe03dda94/style.json?key=pk2XPrDUMOZHUU4S6sH9'
        }).addTo(myMap);
        const polyline = PolylineEncoded.decode(activity.map.summary_polyline);
        const path = L.polyline(polyline, { snakingSpeed: 250 });
        myMap.whenReady(() => {
          setTimeout(() => {
            myMap.addLayer(path);
            path.snakeIn();
          }, 500);
        });
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <CustomHeader>
        <i
          className="fab fa-strava"
          style={{ color: '#fc4c02', marginRight: '1rem' }}
        ></i>{' '}
        <div style={{ marginRight: '0.5rem' }}>Strava</div>
        {stravaActivity[0] && (
          <Item>
            <ActivityStatus date={stravaActivity[0].start_date} />
          </Item>
        )}
      </CustomHeader>
      <div id="mapid" />
    </Container>
  );
};

export default Strava;
