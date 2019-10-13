import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  html {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    line-height: 1;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Lato', sans-serif;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    transition: all 200ms;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }
`;
