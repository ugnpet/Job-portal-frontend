import React from 'react';
import styled from 'styled-components';
import HomeIcon from '../assets/icons/home.svg';

const SvgIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const HomeWithIcon = () => (
  <div>
    <SvgIcon src={HomeIcon} alt="Home Icon" />
    Home
  </div>
);

export default HomeWithIcon;
