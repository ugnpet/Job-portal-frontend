import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUser, removeToken } from '../services/auth';
import api from '../services/api';
import HomeWithIcon from './HomeWithIcon';
import JobWithIcon from './JobWithIcon';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MenuIcon = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.light};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 60px;
  right: 0;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  padding: 0.8rem 0;
  font-size: 1rem;
  text-align: center;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MobileButton = styled.button`
  display: block;
  color: ${({ theme }) => theme.colors.light};
  background: none;
  border: none;
  font-size: 1rem;
  text-align: center;
  padding: 0.8rem 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    api
      .post('/users/logout')
      .then(() => {
        removeToken();
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <HeaderWrapper>
      <Logo to="/">JobPortal</Logo>
      <Nav>
        <NavLink to="/">
          <HomeWithIcon />
        </NavLink>
        <NavLink to="/jobs">
          <JobWithIcon /> 
        </NavLink>
        <NavLink to="/categories">Categories</NavLink>
        {user && user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink onClick={handleLogout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </Nav>
      <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </MenuIcon>
      <MobileMenu open={menuOpen}>
        <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>
          <HomeWithIcon /> 
        </MobileNavLink>
        <MobileNavLink to="/jobs" onClick={() => setMenuOpen(false)}>
          <JobWithIcon /> 
        </MobileNavLink>
        <MobileNavLink to="/categories" onClick={() => setMenuOpen(false)}>
          Categories
        </MobileNavLink>
        {user && user.role === 'admin' && (
          <MobileNavLink to="/admin" onClick={() => setMenuOpen(false)}>
            Admin
          </MobileNavLink>
        )}
        {user ? (
          <>
            <MobileNavLink to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </MobileNavLink>
            <MobileNavLink onClick={handleLogout}>Logout</MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </MobileNavLink>
          </>
        )}
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Header;
