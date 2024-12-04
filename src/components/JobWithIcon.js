import React from 'react';
import styled from 'styled-components';
import JobIcon from '../assets/icons/job.svg';

const SvgIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const JobWithIcon = () => (
  <div>
    <SvgIcon src={JobIcon} alt="Job Icon" />
    Jobs
  </div>
);

export default JobWithIcon;
