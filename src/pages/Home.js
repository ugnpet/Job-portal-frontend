import React from 'react';
import styled, { keyframes } from 'styled-components';
import WorkImage from '../assets/images/work.jpg';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomeWrapper = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1.5s ease-out;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out;
`;

const SubHeading = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.light};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    transform: translateY(-3px);
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Heading>Welcome to JobPortal</Heading>
      <SubHeading>Your gateway to countless job opportunities.</SubHeading>
      <HeroImage src={WorkImage} alt="Job opportunities at JobPortal" />
      <ButtonWrapper>
      <CTAButton to="/jobs">Explore Jobs</CTAButton>
      </ButtonWrapper>
    </HomeWrapper>
  );
};

export default Home;
