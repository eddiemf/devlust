import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import DevLustLogo from '../../images/devlust-logo.svg';

const Header: FunctionComponent = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Link to="/">
          <DevLustLogo width={200} />
        </Link>
        <HeaderNav>
          {/* <Link to="/info">Info</Link> */}
        </HeaderNav>
      </HeaderContainer>
    </StyledHeader>
  );
};

export const headerHeight = 140;

const StyledHeader = styled.header`
  display: grid;
  align-items: center;
  height: ${headerHeight}px;
  padding: 0 40px;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
`;

const HeaderNav = styled.nav`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  gap: 30px;
`;

export default Header;
