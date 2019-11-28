import { Col, Row } from 'react-styled-flexboxgrid';
import { Header } from './Components';
import DefaultTheme from './Themes/default';
import GitHub from './GitHub';
import LightTheme from './Themes/light';
import React, { useState } from 'react';
import Surf from './Surf';
import Twitter from './Twitter';
import Workplaces from './Workplaces';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

interface ProviderProps {
  theme: {
    name: string;
    black: string;
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
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
          Philip London
        </CustomHeader>
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
