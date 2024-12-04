import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { getUser } from '../services/auth';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const JobDetailWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 1rem;
`;

const JobInfo = styled.div`
  margin-bottom: 2rem;

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.8rem 1.5rem;
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

const CommentsSection = styled.div`
  margin-top: 2rem;

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  animation: ${fadeIn} 0.5s ease-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    font-size: 0.9rem;
  }
`;

const CommentForm = styled.form`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;

  textarea {
    padding: 1rem;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.light};
    resize: none;
    height: 100px;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    align-self: start;
    padding: 0.8rem 1.5rem;
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
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
`;

const ModalContent = styled.div`
  padding: 2rem;
  text-align: center;
  animation: ${slideDown} 0.5s ease-out;

  h2 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.light};
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job:', error);
      });

    fetchComments();
  }, [id]);

  const fetchComments = () => {
    api
      .get(`/jobs/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentContent) {
      setError('Comment content is required.');
      return;
    }
    api
      .post(`/jobs/${id}/comments`, { content: commentContent })
      .then(() => {
        setCommentContent('');
        fetchComments();
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to add comment.');
      });
  };

  return (
    <JobDetailWrapper>
      {job && (
        <>
          <Title>{job.title}</Title>
          <JobInfo>
            <p>{job.description}</p>
            <p>Remote: {job.remote ? 'Yes' : 'No'}</p>
            <p>Job Type: {job.jobType}</p>
            <p>Experience Level: {job.experienceLevel}</p>
          </JobInfo>
          <Button onClick={() => setModalOpen(true)}>Apply Now</Button>

          <CommentsSection>
            <h3>Comments</h3>
            {comments.map((comment) => (
              <CommentCard key={comment._id}>
                <p>{comment.content}</p>
                {user && user._id === comment.userId && (
                  <Link to={`/comments/${comment._id}/edit`}>Edit</Link>
                )}
              </CommentCard>
            ))}
            {user ? (
              <CommentForm onSubmit={handleCommentSubmit}>
                <textarea
                  placeholder="Add a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <button type="submit">Submit Comment</button>
              </CommentForm>
            ) : (
              <p>
                <Link to="/login">Login</Link> to add a comment.
              </p>
            )}
          </CommentsSection>
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          <h2>Apply for {job?.title}</h2>
          <p>Please send your resume to example@company.com.</p>
          <button onClick={() => setModalOpen(false)}>Close</button>
        </ModalContent>
      </Modal>
    </JobDetailWrapper>
  );
};

export default JobDetail;
