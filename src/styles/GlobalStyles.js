import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  :root {
    --app-background: #0c1317;
    --primary: #d1d7db;
    --primary-strong: #e9e9ed;
    --header-bg: #202c33;
    --active-filter: #0a332c;
    --own: #00a884;
    --icon-color-light: #aebac1;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    font-family: "Nunito", sans-serif;
  }

  body {
    background-color: var(--app-background);
    color: var(--primary);
  }

  button {
    cursor: pointer;
    transition: all 0.4s ease-in;

    &:hover {
      filter: brightness(110%);
    }

    &:disabled {
      filter: brightness(70%);
    }
  }
`;

export default GlobalStyles;
