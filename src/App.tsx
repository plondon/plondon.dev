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

const emojiStyle = {
  color: 'initial',
  cursor: 'pointer'
};
const SurferInner = styled.div`
  position: relative;
  top: -5rem;
  right: 0;
`;
const SurfEmoji = styled.div<{ left: string }>`
  position: relative;
  top: 3px;
`;
const Wave = styled(SurfEmoji)`
  position: relative;
  transform: scaleX(-1);
  left: ${props => props.left};
`;
const Surfer = styled(SurfEmoji)`
  position: relative;
  left: ${props => props.left};
`;
const SurferContainer = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  margin-right: 0.75rem;
  height: 2.5rem;
  &.ACTIVE {
    ${SurferInner} {
      right: 5rem;
      top: 0rem;
      transition: all 0.75s;
    }
  }
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
  const [transition, setTransition] = useState('');

  const handleThemeChange = () => {
    const nextTheme = theme === 'default' ? 'light' : 'default';
    localStorage.setItem('theme', nextTheme);
    setTransition('ACTIVE');
    setTimeout(() => {
      setTransition('');
      setTheme(nextTheme);
    }, 750);
  };
  const getTheme = () => (theme === 'light' ? LightTheme : DefaultTheme);

  return (
    <ThemeProvider theme={getTheme}>
      <AppContainer>
        <CustomHeader>
          <SurferContainer onClick={handleThemeChange} className={transition}>
            {/* eslint-disable */}
            <SurferInner>
              <Surfer
                role="img"
                aria-label="surfer"
                style={emojiStyle}
                className={transition}
                left="5rem"
              >
                🏄‍♂️
              </Surfer>
              <Wave
                role="img"
                aria-label="wave"
                style={emojiStyle}
                className={transition}
                left="2.5rem"
              >
                🌊
              </Wave>
              <Surfer
                role="img"
                aria-label="surfer"
                style={emojiStyle}
                className={transition}
                left="0rem"
              >
                🏄‍♂️
              </Surfer>
            </SurferInner>
            {/* eslint-enable */}
          </SurferContainer>
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
