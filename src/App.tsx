import { Anchor, Header } from './Components';
import { Col, Row } from 'react-styled-flexboxgrid';
import DefaultTheme from './Themes/default';
import GitHub from './GitHub';
import LightTheme from './Themes/light';
import React, { useState } from 'react';
import Spotify from './Spotify';
// import Strava from './Strava';
import Surf from './Surf';
import Twitter from './Twitter';
import Workplaces from './Workplaces';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

interface ProviderProps {
  theme: {
    name: string;
    black: string;
    grey: string;
    white: string;
  };
}

const AppContainer = styled(Col)`
  padding: 3rem;
`;
const CustomHeader = styled(Header)`
  display: flex;
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    font-weight: 600;
    background-color: ${(props: ProviderProps) => props.theme['black']};
    @media (max-width: 767px) {
      font-size: 12px;
    }
    * {
      transition: color 0.5s;
    }
  }

  // Map style
  #mapid {
    border-radius: 0.25rem;
    margin-top: 1rem;
    height: 18rem;
    width: 30rem;
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .leaflet-top.leaflet-left, .leaflet-bottom {
    display: none;
  }
`;

const App: React.FC = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'default'
  );

  const getTheme = () => (theme === 'light' ? LightTheme : DefaultTheme);

  return (
    <ThemeProvider theme={getTheme}>
      <AppContainer>
        <CustomHeader>
          <Surf setTheme={setTheme} theme={theme} />
          <Anchor href="https://www.linkedin.com/in/philiplondon/">
            Philip London
          </Anchor>
        </CustomHeader>
        <Row>
          <Col xs={12} md={6}>
            <Workplaces />
          </Col>
          <Col xs={12} md={6}>
            <Spotify />
            {/* <Strava /> */}
            <Twitter />
            <GitHub />
          </Col>
        </Row>
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
