import { Col, Row } from 'react-styled-flexboxgrid';
import React from 'react';
import Tweets from './Tweets';
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
const SubHeader = styled.h2`
  color: white;
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
        <SubHeader>
          <span role="img" aria-label="bird" style={{ marginRight: '0.25em' }}>
            🐦
          </span>{' '}
          Tweets
        </SubHeader>
        <Tweets />
        <SubHeader>
          <span role="img" aria-label="cat" style={{ marginRight: '0.25em' }}>
            😻
          </span>{' '}
          GitHub
        </SubHeader>
      </Col>
    </AppContainer>
  );
};

export default App;
