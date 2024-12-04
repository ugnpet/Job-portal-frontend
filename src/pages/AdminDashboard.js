// src/pages/AdminDashboard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AdminWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DashboardTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const DashboardCard = styled(Link)`
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const AdminDashboard = () => {
  return (
    <AdminWrapper>
      <DashboardTitle>Admin Dashboard</DashboardTitle>
      <DashboardGrid>
        <DashboardCard to="/admin/jobs">
          <CardTitle>Manage Jobs</CardTitle>
          <CardDescription>Create, edit, and delete job postings.</CardDescription>
        </DashboardCard>
        <DashboardCard to="/categories">
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>Organize and edit job categories.</CardDescription>
        </DashboardCard>
        <DashboardCard to="/admin/comments">
          <CardTitle>View All Comments</CardTitle>
          <CardDescription>Review and moderate user comments.</CardDescription>
        </DashboardCard>
      </DashboardGrid>
    </AdminWrapper>
  );
};

export default AdminDashboard;
