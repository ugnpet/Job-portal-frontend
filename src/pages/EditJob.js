import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import SuccessModal from '../components/SuccessModal'; // Import SuccessModal

const EditJobWrapper = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 2rem;
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
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.light};
  resize: none;
  height: 120px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.light};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.main};
  gap: 0.5rem;
  cursor: pointer;

  input[type='checkbox'] {
    transform: scale(1.2);
    cursor: pointer;
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
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
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
    fetchJob();
    fetchCategories();
  }, []);

  const fetchJob = () => {
    api
      .get(`/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job:', error);
      });
  };

  const fetchCategories = () => {
    api
      .get('/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/jobs/${id}`, job)
      .then(() => {
        setModalOpen(true);
      })
      .catch((error) => {
        console.error('Error updating job:', error);
      });
  };

  return (
    <EditJobWrapper>
      <Title>Edit Job</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Job Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          required
        />

        <Textarea
          placeholder="Job Description"
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          required
        />

        <CheckboxLabel>
        Remote Work
          <input
            type="checkbox"
            checked={job.remote}
            onChange={(e) => setJob({ ...job, remote: e.target.checked })}
          />
        </CheckboxLabel>

        <Select
          value={job.jobType}
          onChange={(e) => setJob({ ...job, jobType: e.target.value })}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="freelance">Freelance</option>
          <option value="internship">Internship</option>
        </Select>

        <Fieldset>
          <legend>Experience Level</legend>
          <label>
            <input
              type="radio"
              name="experienceLevel"
              value="entry"
              checked={job.experienceLevel === 'entry'}
              onChange={(e) => setJob({ ...job, experienceLevel: e.target.value })}
            />
            Entry-Level
          </label>
          <label>
            <input
              type="radio"
              name="experienceLevel"
              value="mid"
              checked={job.experienceLevel === 'mid'}
              onChange={(e) => setJob({ ...job, experienceLevel: e.target.value })}
            />
            Mid-Level
          </label>
          <label>
            <input
              type="radio"
              name="experienceLevel"
              value="senior"
              checked={job.experienceLevel === 'senior'}
              onChange={(e) => setJob({ ...job, experienceLevel: e.target.value })}
            />
            Senior-Level
          </label>
        </Fieldset>

        <Button type="submit">Update Job</Button>
      </Form>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          navigate('/admin/jobs');
        }}
        message="Job updated successfully!"
      />
    </EditJobWrapper>
  );
};

export default EditJob;
