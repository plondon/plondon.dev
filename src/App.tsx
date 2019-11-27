import { Col, Row } from 'react-styled-flexboxgrid';
import { Header } from './Components';
import GitHub from './GitHub';
import React from 'react';
import Twitter from './Twitter';
import Workplaces from './Workplaces';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './Themes/default';

interface ProviderProps {
  theme: { black: string; grey2: string };
}

const AppContainer = styled(Col)`
  padding: 3rem;
`;

const emojiStyle = { color: 'initial', marginRight: '0.25em' };

const GlobalStyle = createGlobalStyle`
  * {
    color: ${(props: ProviderProps) => props.theme['grey2']};
  }
  html, body {
    font-weight: 600;
    background-color: ${(props: ProviderProps) => props.theme['black']};
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header>
          <span role="img" aria-label="surfer" style={emojiStyle}>
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
