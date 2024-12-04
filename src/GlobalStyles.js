// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  body {
    margin: 0;
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: none;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.light};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${theme.colors.secondary};
    }
  }

  input, select, textarea {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  /* Other global styles */
`;
