// src/services/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from './auth';

const ProtectedRoute = ({ children, adminOnly }) => {
  const user = getUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
