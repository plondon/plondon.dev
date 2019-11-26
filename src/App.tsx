import { Col, Row } from 'react-styled-flexboxgrid';
import { Header, Header3 } from './Components';
import React from 'react';
import Tweets from './Tweets';
import Workplaces from './Workplaces';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './Themes/default';

interface ProviderProps {
  theme: { black: string; grey2: string };
}

const AppContainer = styled(Row)`
  padding: 3rem;
`;
const SubHeader = styled(Header3)`
  color: ${props => props.theme.header};
`;

const emojiStyle = { color: 'initial', marginRight: '0.25em' };

const GlobalStyle = createGlobalStyle`
  * {
    color: ${(props: ProviderProps) => props.theme['grey2']};
  }
  html, body {
    font-weight: 600;
    background-color: ${(props: ProviderProps) => props.theme['black']};
  }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Col xs={12} md={6}>
          <Header>
            <span role="img" aria-label="surfer" style={emojiStyle}>
              🏄‍♂️
            </span>{' '}
            Philip London
          </Header>
          <Workplaces />
        </Col>
        <Col xs={12} md={6}>
          <SubHeader>
            <span role="img" aria-label="bird" style={emojiStyle}>
              🐦
            </span>{' '}
            Tweets
          </SubHeader>
          <Tweets />
          <SubHeader>
            <span role="img" aria-label="cat" style={emojiStyle}>
              😻
            </span>{' '}
            GitHub
          </SubHeader>
        </Col>
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
