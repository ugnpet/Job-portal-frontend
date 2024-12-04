// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { removeToken, getUser } from '../services/auth';

const ProfileWrapper = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const LogoutButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger};
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerHover};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
`;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    api
      .get(`/users/${user._id}`)
      .then((response) => {
        setUserData(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
        });
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate, user._id]);

  const handleLogout = () => {
    api
      .post('/users/logout')
      .then(() => {
        removeToken();
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/users/${user._id}`, formData)
      .then((response) => {
        setUserData(response.data);
        setError('');
        alert('Profile updated successfully');
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Update failed.');
      });
  };

  return (
    <ProfileWrapper>
      {userData && (
        <>
          <ProfileTitle>Your Profile</ProfileTitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">Update Profile</Button>
          </Form>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
