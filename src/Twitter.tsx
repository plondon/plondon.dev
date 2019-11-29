import {
  Header3,
  Skeleton,
  SkeletonContainer,
  SkeletonParent
} from './Components';
import ActivityStatus from './ActivityStatus';
import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import Tweet, { TweetType } from './Tweet';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
require('dotenv').config();

interface Props {}

interface TweetResponse extends AxiosResponse {
  data: Array<TweetType>;
}

export const TWEETS_N = 5;

const Container = styled.div`
  position: relative;
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

export const Tweets: React.FC<Props> = () => {
  const [tweets, setTweets] = useState<Array<TweetType>>([]);
  const [transition, setTransition] = useState('NONE');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/.netlify/functions/get-tweets`)
      .then((res: TweetResponse) => {
        setTransition('ACTIVE');
        setTweets(res.data);
        return;
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <CustomHeader>
        <i
          className="fab fa-twitter"
          style={{ color: '#1da1f2', marginRight: '1rem' }}
        ></i>
        <span style={{ marginRight: '0.25rem' }}>Twitter</span>
        {tweets[0] && (
          <Slider>
            <Item>
              <ActivityStatus date={tweets[0].created_at} />
            </Item>
            <Item>
              <span role="img" aria-label="heart">
                💚
              </span>
              Likes: {tweets[0].user.favourites_count}
            </Item>
            <Item>
              <span role="img" aria-label="friends">
                🚶‍♂️
              </span>
              Following: {tweets[0].user.friends_count}
            </Item>
            <Item>
              <span role="img" aria-label="followers">
                🕺
              </span>
              Followers: {tweets[0].user.followers_count}
            </Item>
          </Slider>
        )}
      </CustomHeader>
      <SkeletonParent style={{ overflow: 'hidden' }}>
        <SkeletonContainer className={transition}>
          {Array.from(Array(TWEETS_N).keys()).map((x, id: number) => {
            return (
              <Skeleton max={TWEETS_N} key={id} n={id} className={transition} />
            );
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
