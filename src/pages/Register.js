import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const FormWrapper = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.light};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
  text-align: center;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post('/users', formData)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Registration failed.');
      });
  };

  return (
    <FormWrapper>
      <Title>Register</Title>
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
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength="7"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
      </Form>
    </FormWrapper>
  );
};

export default Register;
