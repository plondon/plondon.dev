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
