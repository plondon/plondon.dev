import { fadeElements } from './utils';
import React from 'react';
import styled from 'styled-components';

interface TweetType {
  text: string;
  retweeted_status: TweetType;
}

interface Props {
  data: TweetType;
  n: number;
}

const Container = styled.li`
  display: flex;
  margin-top: 1rem;
`;
const Icon = styled.i<{ color: string }>`
  color: ${props => props.color};
  margin-right: 1rem;
`;
const Body = styled.div<{ n: number }>`
  color: ${fadeElements(5)};
  font-weight: 500;
`;

export const Tweet: React.FC<Props> = ({ data, n }) => {
  const isRetweet = data.retweeted_status;

  return (
    <Container>
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
