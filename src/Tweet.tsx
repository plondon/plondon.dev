import { fadeElements } from './utils';
import React, { useState } from 'react';
import styled from 'styled-components';

interface UserType {
  friends_count: number;
  followers_count: number;
}
export interface TweetType {
  text: string;
  retweeted_status: TweetType;
  created_at: string;
  user: UserType;
}

interface Props {
  data: TweetType;
  n: number;
}

const Container = styled.div<{ n: number }>`
  position: relative;
  max-width: 30rem;
  display: flex;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.5s 0.5s;
  &.ACTIVE {
    opacity: 1;
  }
`;
const Icon = styled.i<{ color: string }>`
  color: ${props => props.color};
  margin-right: 1rem;
`;
const Body = styled.div<{ n: number }>`
  color: ${fadeElements(5)};
  font-weight: 500;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
`;

export const Tweet: React.FC<Props> = ({ data, n }) => {
  const [isActive, setIsActive] = useState(false);
  const isRetweet = data.retweeted_status;
  setTimeout(() => {
    setIsActive(true);
  }, 500);

  return (
    <Container className={isActive ? 'ACTIVE' : ''} n={n}>
      {isRetweet ? (
        <Icon className="fas fa-retweet" color="#17BF63"></Icon>
      ) : (
        <Icon className="fas fa-comment-alt" color="#1da1f2"></Icon>
      )}
      <Body n={n + 1}>{data.text}</Body>
    </Container>
  );
};

export default Tweet;
