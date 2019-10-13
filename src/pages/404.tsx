import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Container from '../components/container';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <h1 style={{ marginTop: 0, fontSize: 40 }}>Oh god, I think the dog chewed this page</h1>
      <p>Maybe try another one?</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
