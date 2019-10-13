import React from 'react';
import styled from 'styled-components';

import Container from '../container';

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        © {new Date().getFullYear()} - Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Container>
    </StyledFooter>
  );
};

const footerHeight = 80;
const footerMarginTop = 100;
export const footerTotalHeight = footerHeight + footerMarginTop;

const StyledFooter = styled.footer`
  display: grid;
  align-items: center;
  height: ${footerHeight}px;
  margin-top: ${footerMarginTop}px;
`;

export default Footer;
