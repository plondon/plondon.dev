import { Header3 } from './Components';
import { transparentize } from 'polished';
import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import axios from 'axios';
import styled from 'styled-components';
require('dotenv').config();

interface Props {}

export const TWEETS_N = 5;

const Container = styled.div`
  position: relative;
`;
const SkeletonParent = styled.div`
  position: relative;
  min-height: 20rem;
`;
const SkeletonContainer = styled.div`
  &.ACTIVE {
    position: absolute;
    left: 0;
    width: 100%;
  }
`;

const Skeleton = styled.div<{ n: number }>`
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 1rem 1rem 0 0;
  box-sizing: border-box;
  background-color: ${props =>
    transparentize(
      (TWEETS_N * props.n) / (TWEETS_N * TWEETS_N),
      props.theme.grey1
    )};
  position: relative;
  transition: top 0.5s ${props => `0.${TWEETS_N - props.n}s`},
    opacity 0.5s ${props => `0.${TWEETS_N - props.n}s`};
  top: 0;
  &.ACTIVE {
    top: 1rem;
    opacity: 0;
  }
`;

export const Tweets: React.FC<Props> = () => {
  const [tweets, setTweets] = useState([]);
  const [transition, setTransition] = useState('NONE');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/.netlify/functions/get-tweets`)
      .then(res => {
        setTransition('ACTIVE');
        setTweets(res.data);
        return;
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <Header3>
        <i
          className="fab fa-twitter"
          style={{ color: '#1da1f2', marginRight: '1rem' }}
        ></i>
        Twitter
      </Header3>
      <SkeletonParent style={{ overflow: 'hidden' }}>
        <SkeletonContainer className={transition}>
          {Array.from(Array(TWEETS_N).keys()).map((x, id: number) => {
            return <Skeleton key={id} n={id} className={transition} />;
          })}
        </SkeletonContainer>
        {tweets.map((tweet, id: number) => {
          return <Tweet key={id} n={id} data={tweet} />;
        })}
      </SkeletonParent>
    </Container>
  );
};

export default Tweets;
