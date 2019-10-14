import React from 'react';
import styled from 'styled-components';

import Container from '../container';
import { brandColor } from '../../theme/colors';

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <p>
          © {new Date().getFullYear()} - Built with{' '}
          <GatsbyLink href="https://www.gatsbyjs.org" target="_blank">
            Gatsby ️❤️
          </GatsbyLink>
        </p>
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
  box-shadow: 0px -2px 4px 2px rgba(46, 41, 51, 0.06),
    0px -2px 4px rgba(71, 63, 79, 0.08);
`;

const GatsbyLink = styled.a`
  &:hover {
    color: ${brandColor};
  }
`;

export default Footer;
