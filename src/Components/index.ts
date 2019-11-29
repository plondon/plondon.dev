import { transparentize } from 'polished';
import styled from 'styled-components';

export const Header = styled.header`
  color: ${props => props.theme.white};
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
`;

export const BaseHeader = styled.header`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

export const Header1 = styled(BaseHeader).attrs({
  as: 'h1'
})`
  font-size: 5rem;
`;
export const Header2 = styled(BaseHeader).attrs({
  as: 'h2'
})`
  font-size: 2rem;
`;
export const Header3 = styled(BaseHeader).attrs({
  as: 'h3'
})`
  font-size: 1.75rem;
  color: ${props => props.theme.white};
`;
export const SkeletonParent = styled.div`
  position: relative;
  max-width: 30rem;
`;
export const SkeletonContainer = styled.div`
  &.ACTIVE {
    position: absolute;
    left: 0;
    width: 100%;
  }
`;
export const Skeleton = styled.div<{ n: number; max: number }>`
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 1rem 1rem 0 0;
  box-sizing: border-box;
  background-color: ${props =>
    transparentize(
      (props.max * props.n) / (props.max * props.max),
      props.theme.grey
    )};
  position: relative;
  transition: top 0.5s ${props => `0.${props.max - props.n}s`},
    opacity 0.5s ${props => `0.${props.max - props.n}s`};
  top: 0;
  &.ACTIVE {
    top: 1rem;
    opacity: 0;
  }
`;
