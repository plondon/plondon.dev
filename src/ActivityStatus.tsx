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
  color: ${props => props.theme.color};
  background-color: ${props => props.color};
`;
const Status = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  font-weight: 400;
`;

const ONE_HR_IN_MILLISECONDS = 3.6e6;

export const ActivityStatus: React.FC<Props> = ({ date }) => {
  const today = new Date().getTime();
  const lastActivityDate = new Date(date).getTime();
  const timeSinceLastActivity = today - lastActivityDate;
  const hrsSinceLastActivity = Math.ceil(
    timeSinceLastActivity / ONE_HR_IN_MILLISECONDS
  );

  console.log(hrsSinceLastActivity);

  let activity: 'green' | 'yellow' | 'red';
  switch (true) {
    case hrsSinceLastActivity < 24:
      activity = 'green';
      break;
    case hrsSinceLastActivity < 120:
      activity = 'yellow';
      break;
    default:
      activity = 'red';
      break;
  }

  return (
    <Status>
      <Dot color={activity} /> Last seen {hrsSinceLastActivity}
      {hrsSinceLastActivity === 1 ? 'hr' : 'hrs'} ago
    </Status>
  );
};

export default ActivityStatus;
