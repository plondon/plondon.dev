import { Col, Row } from 'react-styled-flexboxgrid';
import React from 'react';
import Workplaces from './Workplaces';
import styled from 'styled-components';

const AppContainer = styled(Row)`
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
      <Col xs={12} md={6}>
        <Header>
          <span
            role="img"
            aria-label="surfer"
            style={{ marginRight: '0.25em' }}
          >
            🏄‍♂️
          </span>{' '}
          Philip London
        </Header>
        <Workplaces />
      </Col>
      <Col xs={12} md={6}>
        Tweets
      </Col>
    </AppContainer>
  );
};

export default App;
