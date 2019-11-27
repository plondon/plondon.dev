import { Col, Row } from 'react-styled-flexboxgrid';
import { Header } from './Components';
import DefaultTheme from './Themes/default';
import GitHub from './GitHub';
import LightTheme from './Themes/light';
import React, { useState } from 'react';
import Twitter from './Twitter';
import Workplaces from './Workplaces';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

interface ProviderProps {
  theme: {
    black: string;
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
    white: string;
  };
}

const themes = { default: DefaultTheme, light: LightTheme };

const AppContainer = styled(Col)`
  padding: 3rem;
`;

const emojiStyle = { color: 'initial', marginRight: '0.25em' };

const GlobalStyle = createGlobalStyle`
  html, body {
    font-weight: 600;
    background-color: ${(props: ProviderProps) => props.theme['black']};
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
`;

const App: React.FC = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'default'
  );

  const handleThemeChange = () => {
    const nextTheme = theme === 'default' ? 'light' : 'default';
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };
  const getTheme = () => (theme === 'light' ? LightTheme : DefaultTheme);

  return (
    <ThemeProvider theme={getTheme}>
      <AppContainer>
        <Header>
          <span
            role="img"
            aria-label="surfer"
            style={emojiStyle}
            onClick={handleThemeChange}
          >
            🏄‍♂️
          </span>{' '}
          Philip London
        </Header>
        <Row>
          <Col xs={12} md={6}>
            <Workplaces />
          </Col>
          <Col xs={12} md={6}>
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
