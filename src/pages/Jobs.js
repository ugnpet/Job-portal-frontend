import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { StyledDropdown } from '../components/StyledDropdown';

const JobsWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const FilterWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const StyledDropdownWrapper = styled.div`
  width: 300px;

  select {
    padding: 0.8rem;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.light};
    width: 100%;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
    }
  }
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const JobCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    flex-grow: 1;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1rem;
  }

  a {
    text-align: center;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    api
      .get('/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  };

  const fetchCategories = async () => {
    try {
      const categoryResponse = await api.get('/categories');
      setCategories(categoryResponse.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === '') {
      fetchJobs();
    } else {
      api
        .get(`/categories/${categoryId}/jobs`)
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching jobs by category:', error);
        });
    }
  };

  return (
    <JobsWrapper>
      <Title>Available Jobs</Title>
      <FilterWrapper>
        <StyledDropdownWrapper>
          <StyledDropdown value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </StyledDropdown>
        </StyledDropdownWrapper>
      </FilterWrapper>
      <JobsGrid>
        {jobs.map((job) => (
          <JobCard key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <Link to={`/jobs/${job._id}`}>View Details</Link>
          </JobCard>
        ))}
      </JobsGrid>
    </JobsWrapper>
  );
};

export default Jobs;
