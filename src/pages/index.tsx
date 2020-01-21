import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import PostList from '../components/postList';
import SEO from '../components/seo';
import PostParser from '../utils/PostParser';

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
          }
          fileAbsolutePath
        }
      }
    }
  }
`;

const IndexPage = ({ data }: IndexPageProps) => {
  const posts = PostParser.parsePostEdges(data.allMarkdownRemark.edges);

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

  @media screen and (max-width: 767px) {
    padding-top: 20px;
  }
`;
