import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { GlobalStyles } from '../../theme';
import Header, { headerHeight } from '../header';
import Footer, { footerTotalHeight } from '../footer';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <LayoutBase>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700,700i|Montserrat:300,300i,400,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles />

      <Header />

      <MainContent>{children}</MainContent>

      <Footer />
    </LayoutBase>
  );
};

const LayoutBase = styled.div`
  background-color: #fff;
`;

const MainContent = styled.main`
  min-height: calc(100vh - ${headerHeight}px - ${footerTotalHeight}px);
`;

export default Layout;
