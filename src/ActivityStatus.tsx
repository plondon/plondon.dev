import React from 'react';

interface Props {
  date: string;
}

const ONE_DAY_IN_MILLISECONDS = 8.64e7;

export const ActivityStatus: React.FC<Props> = ({ date }) => {
  const today = new Date().getTime();
  const lastActivityDate = new Date(date).getTime();
  const timeSinceLastActivity = today - lastActivityDate;
  const daysSinceLastActivity = timeSinceLastActivity / ONE_DAY_IN_MILLISECONDS;

  let activity;
  switch (true) {
    case daysSinceLastActivity < 1:
      activity = 'GREEN';
      break;
    case daysSinceLastActivity < 7:
      activity = 'YELLOW';
      break;
    default:
      activity = 'RED';
      break;
  }

  return <div>{activity}</div>;
};

export default ActivityStatus;
