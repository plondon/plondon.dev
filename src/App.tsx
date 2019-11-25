import React from 'react';
import Workplaces from './Workplaces';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 3em;
`;
const Header = styled.header`
  color: white;
  font-size: 2.5em;
  font-weight: 600;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header>
        <span role="img" aria-label="surfer" style={{ marginRight: '0.25em' }}>
          🏄‍♂️
        </span>{' '}
        Philip London
      </Header>
      <Workplaces />
    </AppContainer>
  );
};

export default App;
