import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: Array<ReactElement<any>>;
  itemMarginBottom: number;
}

const SLIDER_TIMING = 5;
const TRANSITION_TIMING = 0.5;

const Container = styled.div`
  margin-left: 0.5rem;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const ItemContainer = styled.div<{
  height: number;
  index: number;
  itemMarginBottom: number;
}>`
  top: calc(
    (
        ${props => props.itemMarginBottom * props.index}rem +
          ${props => props.height * props.index}px
      ) * -1
  );
  position: relative;
  transition: ${props => (props.index !== 0 ? 'top 0.5s' : 'top 0s')};
`;

export const Slider: React.FC<Props> = ({ children, itemMarginBottom }) => {
  let [index, setIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const NUM_OF_SLIDES = children.length;
  let Slides = children.slice();
  Slides.push(children[0]);

  useEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      if (nextIndex === NUM_OF_SLIDES) {
        setTimeout(() => {
          setIndex(0);
        }, TRANSITION_TIMING * 1000);
      }
    }, SLIDER_TIMING * 1000);
    return () => clearInterval(interval);
  });

  return (
    <Container ref={ref}>
      <ItemContainer
        height={height}
        index={index}
        itemMarginBottom={itemMarginBottom}
      >
        {Slides}
      </ItemContainer>
    </Container>
  );
};

export default Slider;
