import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import Layout from '../components/layout';
import { parsePostNode } from '../utils/dataParsers';
import SEO from '../components/seo';
import Container from '../components/container';

interface PostTemplateProps {
  data: {
    markdownRemark: any;
  };
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        slug
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const PostTemplate = ({ data }: PostTemplateProps) => {
  const post = parsePostNode(data.markdownRemark);

  return (
    <Layout>
      <SEO title={post.title} />

      <Container>
        <Image fluid={post.image.childImageSharp.fluid} />
        <h1>{post.title}</h1>
        <p>{post.date}</p>
        <br />
        <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </Layout>
  );
};

export default PostTemplate;

const PostContent = styled.div`
  line-height: 1.6;
`;
