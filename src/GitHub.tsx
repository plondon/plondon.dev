import {
  Anchor,
  Header3,
  Skeleton,
  SkeletonContainer,
  SkeletonParent
} from './Components';
import ActivityStatus from './ActivityStatus';
import GitHubActivity, { GitHubActivityType } from './GitHubActivity';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

const ACTIVITY_TYPE_WHITELIST = [
  'PushEvent'
  // 'PullEvent',
  // 'IssuesEvent',
  // 'StarEvent'
];

interface Props {}
interface GitHubResponse extends AxiosResponse {
  data: Array<GitHubActivityType>;
}

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

const GITHUB_N = 5;

export const GitHub: React.FC<Props> = () => {
  const [transition, setTransition] = useState('NONE');
  const [gitHubActivity, setGithubActivity] = useState<
    Array<GitHubActivityType>
  >([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/.netlify/functions/get-github-activity`
      )
      .then((res: GitHubResponse) => {
        setTransition('ACTIVE');
        const filteredActivity = res.data
          .filter(activity => {
            return ACTIVITY_TYPE_WHITELIST.indexOf(activity.type) > -1;
          })
          .slice(0, 5);
        console.log(filteredActivity);
        setGithubActivity(filteredActivity);
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
        <div style={{ marginRight: '0.5rem' }}>
          <Anchor href="https://github.com/plondon">GitHub</Anchor>
        </div>
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
          return <GitHubActivity n={id} data={activity} />;
        })}
      </SkeletonParent>
    </Container>
  );
};

export default GitHub;
