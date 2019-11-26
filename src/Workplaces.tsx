import { Header1 } from './Components';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2.5rem;
`;
const Workplace = styled.div`
  margin-bottom: 2rem;
  ul {
    margin-top: 0.75rem;
  }
  li {
    margin-bottom: 0.35rem;
  }
`;
const Date = styled.span`
  font-size: 1rem;
  color: ${props => props.theme['grey3']};
`;
const CurrentWorkplace = styled(Header1)`
  color: ${props => props.theme['white']};
  ${Date} {
    color: ${props => props.theme['white']};
  }
`;
const CurrentPosition = styled.li`
  color: ${props => props.theme['white']};
`;

export const Workplaces: React.FC = () => {
  return (
    <Container>
      <Workplace>
        <CurrentWorkplace>Blockchain</CurrentWorkplace>
        <ul>
          <CurrentPosition>Senior Engineer</CurrentPosition>
          <li>Lead Wallet & UX Developer</li>
          <li>Lead UX Developer</li>
          <li>UX Developer</li>
        </ul>
      </Workplace>
      <Workplace>
        <Header1>BORN Group</Header1>
        <ul>
          <li>Senior Frontend Developer</li>
          <li>Frontend Developer</li>
        </ul>
      </Workplace>
      <Workplace>
        <Header1>powerHouse</Header1>
        <ul>
          <li>Web Design and Media Intern</li>
        </ul>
      </Workplace>
    </Container>
  );
};

export default Workplaces;
