import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/postList';
import { parsePostsData } from '../utils/dataParsers';

interface IndexPageProps {
  data: {
    allMarkdownRemark: any;
  };
}

export const query = graphql`
  query Posts {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { isDraft: { ne: true } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            date
            slug
            title
            excerpt
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            thumbnail {
              childImageSharp {
                fixed {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }: IndexPageProps) => {
  const posts = parsePostsData(data.allMarkdownRemark);

  return (
    <Layout>
      <SEO title="Home" />

      <PostsSection>
        <PostList posts={posts} />
      </PostsSection>
    </Layout>
  );
};

export default IndexPage;

const PostsSection = styled.section`
  padding-top: 100px;
`;
