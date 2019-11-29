import React from 'react';
import styled from 'styled-components';

interface Props {
  date: string;
}

const Dot = styled.div<{ color: string }>`
  margin-right: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${props => props.color};
`;
const Status = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  font-weight: 400;
`;

const ONE_DAY_IN_MILLISECONDS = 8.64e7;

export const ActivityStatus: React.FC<Props> = ({ date }) => {
  const today = new Date().getTime();
  const lastActivityDate = new Date(date).getTime();
  const timeSinceLastActivity = today - lastActivityDate;
  const daysSinceLastActivity = timeSinceLastActivity / ONE_DAY_IN_MILLISECONDS;

  let activity: 'GREEN' | 'YELLOW' | 'RED';
  switch (true) {
    case daysSinceLastActivity < 1:
      activity = 'GREEN';
      break;
    case daysSinceLastActivity < 5:
      activity = 'YELLOW';
      break;
    default:
      activity = 'RED';
      break;
  }

  const colors = {
    GREEN: '#00875A',
    RED: '#D93B30',
    YELLOW: '#FFD6AD'
  };

  return (
    <Status>
      <Dot color={colors[activity]} /> Last Active{' '}
      {new Date(date).toLocaleDateString()}
    </Status>
  );
};

export default ActivityStatus;
