import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { Link } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';

const AdminJobsWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const JobList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

const JobItem = styled.li`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Fieldset = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
  border-radius: 5px;

  legend {
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
  }

  label {
    display: inline-flex;
    align-items: center;
    margin-right: 1rem;

    input[type='radio'] {
      margin-right: 0.5rem;
    }
  }
`;

const Form = styled.form`
  display: grid;
  grid-gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  resize: none; /* Prevent resizing */

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;


const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem; /* Space between buttons */
  justify-content: flex-start; /* Align buttons to the left */
`;

const Select = styled.select`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;

  input[type='checkbox'] {
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    categoryId: '',
    remote: false,
    jobType: 'full-time',
    experienceLevel: 'entry',
  });
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchCategories();
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
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    api
      .post('/jobs', newJob)
      .then(() => {
        setModalOpen(true);
        fetchJobs();
        setNewJob({
          title: '',
          description: '',
          categoryId: '',
          remote: false,
          jobType: 'full-time',
          experienceLevel: 'entry',
        });
      })
      .catch((error) => {
        console.error('Error creating job:', error);
      });
  };

  const handleDeleteJob = (jobId) => {
    api
      .delete(`/jobs/${jobId}`)
      .then(() => {
        fetchJobs();
      })
      .catch((error) => {
        console.error('Error deleting job:', error);
      });
  };

  return (
    <AdminJobsWrapper>
      <Title>Manage Jobs</Title>

      <Form onSubmit={handleCreateJob}>
        <Input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Job Description"
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
          rows="4"
          required
        />
        <CheckboxLabel>
        Remote Work
          <Input
            type="checkbox"
            checked={newJob.remote}
            onChange={(e) => setNewJob({ ...newJob, remote: e.target.checked })}
          />
        </CheckboxLabel>
        <Select
          value={newJob.jobType}
          onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="freelance">Freelance</option>
          <option value="internship">Internship</option>
        </Select>
        <Select
          value={newJob.categoryId}
          onChange={(e) => setNewJob({ ...newJob, categoryId: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Fieldset>
          <legend>Experience Level</legend>
          <CheckboxLabel>
            <Input
              type="radio"
              name="experienceLevel"
              value="entry"
              checked={newJob.experienceLevel === 'entry'}
              onChange={(e) => setNewJob({ ...newJob, experienceLevel: e.target.value })}
            />
            Entry-Level
          </CheckboxLabel>
          <CheckboxLabel>
            <Input
              type="radio"
              name="experienceLevel"
              value="mid"
              checked={newJob.experienceLevel === 'mid'}
              onChange={(e) => setNewJob({ ...newJob, experienceLevel: e.target.value })}
            />
            Mid-Level
          </CheckboxLabel>
          <CheckboxLabel>
            <Input
              type="radio"
              name="experienceLevel"
              value="senior"
              checked={newJob.experienceLevel === 'senior'}
              onChange={(e) => setNewJob({ ...newJob, experienceLevel: e.target.value })}
            />
            Senior-Level
          </CheckboxLabel>
        </Fieldset>
        <Button type="submit">Create Job</Button>
      </Form>

      <JobList>
        {jobs.map((job) => (
            <JobItem key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Remote: {job.remote ? 'Yes' : 'No'}</p>
            <p>Type: {job.jobType}</p>
            <p>Experience Level: {job.experienceLevel}</p>
            <ButtonWrapper>
                <Link to={`/jobs/${job._id}/edit`} style={{ flex: 1, textDecoration: 'none' }}>
                <Button>Edit</Button>
                </Link>
                <Button onClick={() => handleDeleteJob(job._id)}>Delete</Button>
            </ButtonWrapper>
            </JobItem>
        ))}
        </JobList>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message="Job created successfully!"
      />
    </AdminJobsWrapper>
  );
};

export default AdminJobs;
