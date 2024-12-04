import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal'; // Import your custom SuccessModal
import ConfirmationModal from '../components/ConfirmationModal'; // Import a ConfirmationModal

const EditWrapper = styled.div`
  padding: 2rem;
  max-width: 600px;
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

const Form = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.light};
  resize: none;
  height: 150px;

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
  width: 100%; /* Ensures all buttons are the same size */
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &.delete {
    background-color: ${({ theme }) => theme.colors.danger};

    &:hover {
      background-color: ${({ theme }) => theme.colors.dangerDark};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
  text-align: center;
`;

const CommentEdit = () => {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/comments/${id}`)
      .then((response) => {
        setCommentContent(response.data.content);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to fetch comment.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/comments/${id}`, { content: commentContent })
      .then(() => {
        setSuccessModalOpen(true); // Show success modal
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to update comment.');
      });
  };

  const handleDelete = () => {
    setConfirmationModalOpen(true); // Show confirmation modal
  };

  const confirmDelete = () => {
    setConfirmationModalOpen(false); // Close confirmation modal
    api
      .delete(`/comments/${id}`)
      .then(() => {
        setSuccessModalOpen(true); // Show success modal after deletion
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to delete comment.');
      });
  };

  return (
    <EditWrapper>
      <Title>Edit Comment</Title>
      <Form onSubmit={handleSubmit}>
        <Textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWrapper>
          <Button type="submit">Update Comment</Button>
          <Button type="button" className="delete" onClick={handleDelete}>
            Delete Comment
          </Button>
        </ButtonWrapper>
      </Form>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigate(-1);
        }}
        message="Comment updated successfully!"
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmationModalOpen(false)}
        message="Are you sure you want to delete this comment?"
      />
    </EditWrapper>
  );
};

export default CommentEdit;
