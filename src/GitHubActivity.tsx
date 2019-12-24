import { Col, Row } from 'react-styled-flexboxgrid';
import { fadeElements } from './utils';
import React, { useState } from 'react';
import styled from 'styled-components';

export interface GitHubActivityType {
  created_at: string;
  payload: {
    commits: Array<{ message: string }>;
    pull_request?: {
      title: string;
    };
  };
  repo: {
    name: string;
  };
  type: string;
}

interface Props {
  data: GitHubActivityType;
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
  width: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
`;
const CustomRow = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;
const GitHubIcon = ({ type }: GitHubActivityType) => {
  switch (type) {
    case 'PushEvent':
      return <Icon className="fas fa-file-upload" color="#00875A"></Icon>;
    case 'WatchEvent':
      return <Icon className="fas fa-star" color="#f9d71c"></Icon>;
    case 'PullRequestEvent':
      return <Icon className="fas fa-code-branch" color="#6f42c1"></Icon>;
    default:
      return <Icon className="fas fa-code-branch" color="#6f42c1"></Icon>;
  }
};

const GitHubMessage = ({ type, payload, repo }: GitHubActivityType) => {
  switch (type) {
    case 'PushEvent':
      return (
        <>
          <div>
            {payload.commits.map((commit, i) => (
              <div key={i}>{commit.message}</div>
            ))}
          </div>
          <div style={{ fontSize: '0.75rem' }}>{repo.name}</div>
        </>
      );
    case 'WatchEvent':
      return <div>{repo.name}</div>;
    case 'PullRequestEvent':
      return <div>{payload.pull_request && payload.pull_request.title}</div>;
    default:
      return null;
  }
};

export const GitHubActivity: React.FC<Props> = ({ data, n }) => {
  const [isActive, setIsActive] = useState(false);
  setTimeout(() => {
    setIsActive(true);
  }, 500);

  return (
    <Container className={isActive ? 'ACTIVE' : ''} n={n}>
      <GitHubIcon {...data} />
      <Body n={n + 1}>
        <CustomRow>
          <Col>
            <GitHubMessage {...data} />
          </Col>
          <Col style={{ fontSize: '0.75rem' }}>
            {new Date(data.created_at).toLocaleDateString()}
          </Col>
        </CustomRow>
      </Body>
    </Container>
  );
};

export default GitHubActivity;
