import {
  Header3,
  Skeleton,
  SkeletonContainer,
  SkeletonParent
} from './Components';
import { fadeElements } from './utils';
import ActivityStatus from './ActivityStatus';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

interface Props {}

interface GitHubActivity {
  created_at: string;
  payload: {
    commits: Array<{ message: string }>;
  };
}
interface GitHubResponse extends AxiosResponse {
  data: Array<GitHubActivity>;
}

const Container = styled.div`
  margin-top: 2.5rem;
`;
const ActivityContainer = styled.div<{ n: number }>`
  position: relative;
  max-width: 30rem;
  display: flex;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.5s 0.5s;
  color: ${fadeElements(5)};
  &.ACTIVE {
    opacity: 1;
  }
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

const GITHUB_N = 5;

export const GitHub: React.FC<Props> = () => {
  const [isActive, setIsActive] = useState(false);
  const [transition, setTransition] = useState('NONE');
  const [gitHubActivity, setGithubActivity] = useState<Array<GitHubActivity>>(
    []
  );

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/.netlify/functions/get-github-activity`
      )
      .then((res: GitHubResponse) => {
        setTransition('ACTIVE');
        setGithubActivity(res.data);
        setTimeout(() => {
          setIsActive(true);
        }, 500);
        return;
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <CustomHeader>
        <i
          className="fab fa-github"
          style={{ color: '#f6f8fa', marginRight: '1rem' }}
        ></i>{' '}
        <div style={{ marginRight: '0.5rem' }}>GitHub</div>
        {gitHubActivity[0] && (
          <Item>
            <ActivityStatus date={gitHubActivity[0].created_at} />
          </Item>
        )}
      </CustomHeader>
      <SkeletonParent style={{ overflow: 'hidden' }}>
        <SkeletonContainer className={transition}>
          {Array.from(Array(GITHUB_N).keys()).map((x, id: number) => {
            return (
              <Skeleton max={GITHUB_N} key={id} n={id} className={transition} />
            );
          })}
        </SkeletonContainer>
        {gitHubActivity.map((activity, id: number) => {
          return (
            <ActivityContainer
              n={id}
              key={id}
              className={isActive ? 'ACTIVE' : ''}
            >
              {activity.payload.commits[0].message}
            </ActivityContainer>
          );
        })}
      </SkeletonParent>
    </Container>
  );
};

export default GitHub;
