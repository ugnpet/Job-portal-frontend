import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.light};
  padding: 2rem;
  margin: 10% auto;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ theme, confirm }) =>
    confirm ? theme.colors.danger : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
`;

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <p>{message}</p>
        <Button confirm onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
