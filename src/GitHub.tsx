import { Header3 } from './Components';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const Container = styled.div`
  margin-top: 3rem;
`;

export const GitHub: React.FC<Props> = () => {
  return (
    <Container>
      <Header3>
        <i
          className="fab fa-github"
          style={{ color: '#4078c0', marginRight: '1rem' }}
        ></i>{' '}
        GitHub
      </Header3>
    </Container>
  );
};

export default GitHub;
