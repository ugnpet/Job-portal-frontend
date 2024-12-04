import styled from 'styled-components';

export const StyledDropdown = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  width: 100%; 

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;
