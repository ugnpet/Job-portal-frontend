import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

const CategoryJobsWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
`;

const JobCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }

  a {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const EmptyState = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 2rem;
`;

const CategoryJobs = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api
      .get(`/categories/${id}/jobs`)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, [id]);

  return (
    <CategoryJobsWrapper>
      <Title>Jobs in Category</Title>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <Link to={`/jobs/${job._id}`}>View Details</Link>
          </JobCard>
        ))
      ) : (
        <EmptyState>No jobs found in this category.</EmptyState>
      )}
    </CategoryJobsWrapper>
  );
};

export default CategoryJobs;
