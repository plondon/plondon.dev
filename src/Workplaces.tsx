import { Header1 } from './Components';
import { fadeElements } from './utils';
import React from 'react';
import styled from 'styled-components';

const MAX = 15;

const Container = styled.div``;
const Workplace = styled.div`
  margin-bottom: 2rem;
  ul {
    margin-top: 0.75rem;
  }
  li {
    margin-bottom: 0.35rem;
  }
`;
const Company = styled(Header1)<{ n: number }>`
  color: ${fadeElements(MAX)};
`;
const Date = styled.span<{ n: number }>`
  font-size: 1rem;
  color: ${fadeElements(MAX)};
`;
const Position = styled.li<{ n: number }>`
  font-size: 1.5rem;
  color: ${fadeElements(MAX)};
`;

export const Workplaces: React.FC = () => {
  return (
    <Container>
      <Workplace>
        <Company n={1}>Map3</Company>
        <Date n={1}>2022-Today</Date>
        <ul>
          <Position n={1}>Co-Founder & Lead Engineer</Position>
        </ul>
      </Workplace>
      <Workplace>
        <Company n={3}>Blockchain</Company>
        <Date n={4}>2016-2022</Date>
        <ul>
          <Position n={5}>Senior Engineer</Position>
          <Position n={6}>Lead Wallet & UX Developer</Position>
          <Position n={7}>Lead UX Developer</Position>
          <Position n={8}>UX Developer</Position>
        </ul>
      </Workplace>
      <Workplace>
        <Company n={9}>BORN Group</Company>
        <Date n={10}>2014-2016</Date>
        <ul>
          <Position n={11}>Senior Frontend Developer</Position>
          <Position n={12}>Frontend Developer</Position>
        </ul>
      </Workplace>
      <Workplace>
        <Company n={13}>powerHouse</Company>
        <Date n={14}>2013</Date>
        <ul>
          <Position n={MAX}>Web Design and Media Intern</Position>
        </ul>
      </Workplace>
    </Container>
  );
};

export default Workplaces;
