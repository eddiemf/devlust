import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Container from '../components/container';
import { brandColor } from '../theme/colors';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <h1 style={{ marginTop: 0, fontSize: 40, color: brandColor }}>
        The page you are looking for was not found in this dimension.
      </h1>
      <p>Maybe try a different one?</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
