// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
  padding: 1rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
    </FooterWrapper>
  );
};

export default Footer;

