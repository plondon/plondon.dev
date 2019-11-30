import {
  Header3,
  Skeleton,
  SkeletonContainer,
  SkeletonParent
} from './Components';
import ActivityStatus from './ActivityStatus';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

interface Props {}

interface StravaActivity {
  start_date: string;
}

interface StravaResponse extends AxiosResponse {
  data: Array<StravaActivity>;
}

const STRAVA_N = 5;

const Container = styled.div`
  margin-top: 2.5rem;
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
        setTransition('ACTIVE');
        setStravaActivity(res.data);
        console.log(res.data);
        return;
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
      <SkeletonParent style={{ overflow: 'hidden' }}>
        <SkeletonContainer className={transition}>
          {Array.from(Array(STRAVA_N).keys()).map((x, id: number) => {
            return (
              <Skeleton max={STRAVA_N} key={id} n={id} className={transition} />
            );
          })}
        </SkeletonContainer>
      </SkeletonParent>
    </Container>
  );
};

export default Strava;
