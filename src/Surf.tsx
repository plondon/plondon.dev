import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  setTheme: (theme: string) => void;
  theme: string;
}

const TIMING = 1.5;

const SurferInner = styled.div`
  position: relative;
  top: -5rem;
  right: 0;
`;
const Emoji = styled.div<{ left: string }>`
  color: initial;
  cursor: pointer;
  position: relative;
  top: 3px;
`;
const Wave = styled(Emoji)`
  position: relative;
  transform: scaleX(-1);
  left: ${props => props.left};
`;
const Surfer = styled(Emoji)`
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
      transition: all ${TIMING}s;
    }
  }
`;

export const Surf: React.FC<Props> = ({ theme, setTheme }) => {
  const [transition, setTransition] = useState('');

  const handleThemeChange = () => {
    const nextTheme = theme === 'default' ? 'light' : 'default';
    localStorage.setItem('theme', nextTheme);
    setTransition('ACTIVE');
    setTimeout(() => {
      setTransition('');
      setTheme(nextTheme);
    }, TIMING * 1000);
  };

  return (
    <SurferContainer onClick={handleThemeChange} className={transition}>
      {/* eslint-disable */}
      <SurferInner>
        <Surfer
          role="img"
          aria-label="surfer"
          className={transition}
          left="5rem"
        >
          🏄‍♂️
        </Surfer>
        <Wave role="img" aria-label="wave" className={transition} left="2.5rem">
          🌊
        </Wave>
        <Surfer
          role="img"
          aria-label="surfer"
          className={transition}
          left="0rem"
        >
          🏄‍♂️
        </Surfer>
      </SurferInner>
      {/* eslint-enable */}
    </SurferContainer>
  );
};

export default Surf;
