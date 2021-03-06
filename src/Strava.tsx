import * as L from 'leaflet';
import * as PolylineEncoded from 'polyline-encoded';
import { Header3, Text } from './Components';
import ActivityStatus from './ActivityStatus';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

interface Props {}

interface StravaActivity {
  name: string;
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
const MapContainer = styled.div`
  position: relative;
  opacity: 0;
  transition: 0.5s 0.5s;
  &.ACTIVE {
    opacity: 1;
  }
`;
const MapInfo = styled.div`
  z-index: 400;
  position: absolute;
  padding: 1rem;
  width: 100%;
  bottom: 0;
  left: 0;
`;
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

const average = (x: number, y: number) => {
  return (x + y) / 2;
};

const calcCenter = (activity: StravaActivity) => {
  const LatLng = PolylineEncoded.decode(activity.map.summary_polyline);
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  LatLng.forEach((ll: Array<number>) => {
    if (ll[0] < minLat) {
      minLat = ll[0];
    }
    if (ll[0] > maxLat) {
      maxLat = ll[0];
    }
    if (ll[1] < minLng) {
      minLng = ll[1];
    }
    if (ll[1] > maxLng) {
      maxLng = ll[1];
    }
  });

  return [average(minLat, maxLat), average(minLng, maxLng)];
};

export const Strava: React.FC<Props> = () => {
  const [transition, setTransition] = useState('NONE');
  const [stravaActivity, setStravaActivity] = useState<Array<StravaActivity>>(
    []
  );

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_ROOT_URL
        }/.netlify/functions/get-strava-activity`
      )
      .then((res: StravaResponse) => {
        setStravaActivity(res.data);
        const activity = res.data[0];
        const myMap = L.map('mapid', {
          doubleClickZoom: false,
          dragging: false,
          scrollWheelZoom: false
        }).setView(calcCenter(activity), 13.45);
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
          console.log('READY');
          setTransition('ACTIVE');
          setTimeout(() => {
            myMap.addLayer(path);
            path.snakeIn();
          }, 1500);
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
        />{' '}
        <div style={{ marginRight: '0.5rem' }}>Strava</div>
        {stravaActivity[0] && (
          <Item>
            <ActivityStatus date={stravaActivity[0].start_date} />
          </Item>
        )}
      </CustomHeader>
      <MapContainer className={transition}>
        <div id="mapid" />
        {stravaActivity[0] && (
          <MapInfo>
            <Text fontSize="1.25rem">{stravaActivity[0].name}</Text>
          </MapInfo>
        )}
      </MapContainer>
    </Container>
  );
};

export default Strava;
