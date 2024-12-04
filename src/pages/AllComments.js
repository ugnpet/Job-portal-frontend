import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const AllCommentsWrapper = styled.div`
  padding: 2rem;
`;

const CategorySection = styled.div`
  margin-bottom: 2rem;
`;

const CategoryHeader = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;
`;

const JobSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr; /* Jobs on the left, comments on the right */
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack on small screens */
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const JobDetails = styled(Card)`
  h4 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
  }
`;

const CommentsWrapper = styled(Card)`
  h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CommentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
`;

const EmptyState = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1rem;
`;

const AllComments = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get('/categories/all-comments')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  return (
    <AllCommentsWrapper>
      <h2>All Comments</h2>
      {categories.map((category) => (
        <CategorySection key={category._id}>
          <CategoryHeader>{category.name}</CategoryHeader>
          {category.jobs.map((job) => (
            <JobSection key={job._id}>
              <JobDetails>
                <h4>{job.title}</h4>
                <p>{job.description}</p>
              </JobDetails>
              <CommentsWrapper>
                <h4>Comments</h4>
                {job.comments.length > 0 ? (
                  job.comments.map((comment) => (
                    <CommentCard key={comment._id}>
                      <p>{comment.content}</p>
                    </CommentCard>
                  ))
                ) : (
                  <EmptyState>No comments for this job.</EmptyState>
                )}
              </CommentsWrapper>
            </JobSection>
          ))}
        </CategorySection>
      ))}
    </AllCommentsWrapper>
  );
};

export default AllComments;
