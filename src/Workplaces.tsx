import React from 'react';
import styled from 'styled-components';

const Date = styled.span`
  font-size: 0.65em;
`;

export const Workplaces: React.FC = () => {
  return (
    <>
      <h3>
        Blockchain <Date>2016 - 2019</Date>
      </h3>
      <ul>
        <li>Senior Engineer: Blockchain</li>
        <li>Lead Wallet & UX Developer</li>
        <li>Lead UX Developer</li>
        <li>UX Developer</li>
      </ul>
      <h3>
        BORN Group <Date>2014 - 2016</Date>
      </h3>
      <ul>
        <li>Senior Frontend Developer</li>
        <li>Frontend Developer</li>
      </ul>
      <h3>
        powerHouse Books <Date>2013</Date>
      </h3>
      <ul>
        <li>Web Design and Media Intern</li>
      </ul>
    </>
  );
};

export default Workplaces;
