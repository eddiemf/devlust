import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { brandColor } from './colors';

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    line-height: 1;
    color: #333;

    @media screen and (max-width: 767px) {
      font-size: 18px;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Lato', sans-serif;
    font-size: 30px;
    font-weight: 900;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: ${brandColor};
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
