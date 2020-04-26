import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Container from '../components/container';
import Layout from '../components/layout';
import DateFormatter from '../components/postCard/DateFormatter';
import SEO from '../components/seo';
import { brandColor } from '../theme/colors';
import PostParser from '../utils/PostParser';

interface PostTemplateProps {
  data: {
    markdownRemark: any;
    site: any;
  };
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        url
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
`;

const PostTemplate = ({ data }: PostTemplateProps) => {
  const post = PostParser.parsePostNode(data.markdownRemark);
  const dateFormatter = new DateFormatter({ date: post.date });

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} />

      <Container>
        <PostHeader>
          <Title>{post.title}</Title>
          <PostMeta>
            <Date>{dateFormatter.format()}</Date>
            <MetaSeparator>|</MetaSeparator>
            <LinkToEdit
              href={post.urlToEdit}
              target="_blank"
              rel="noopener noreferrer"
            >
              Edit on Github
            </LinkToEdit>
          </PostMeta>
          <Excerpt>{post.excerpt}</Excerpt>
        </PostHeader>
        <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
        <TwitterLink
          href={`https://twitter.com/search?q=${data.site.siteMetadata.url}${post.slug}`}
          target="_blank"
        >
          Discuss on Twitter
        </TwitterLink>
      </Container>
    </Layout>
  );
};

export default PostTemplate;

const underlined = `
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: ${brandColor};
  }
`;

const PostContent = styled.div`
  line-height: 1.6;
  margin-bottom: 100px;
  ${underlined}

  &:after {
    bottom: -50px;
  }

  h1,
  h2,
  h3 {
    position: relative;
    margin-bottom: 40px;
    color: ${brandColor};
  }

  h1,
  h2 {
    ${underlined}

    &:after {
      bottom: -5px;
      height: 3px;
      width: 50px;
      border-radius: 8px;
    }
  }

  h3 {
    margin-bottom: 20px;
    font-size: 22px;
  }

  a:not(.gatsby-resp-image-link) {
    ${underlined}
    &:after {
      height: 2px;
    }
  }

  .language-text {
    padding-left: 8px;
    padding-right: 8px;
    background-color: ${brandColor};
    color: #fff;
  }

  ul {
    padding-left: 20px;
  }

  li {
    position: relative;
    margin: 10px 0;

    &:before {
      content: '';
      position: absolute;
      top: 12px;
      left: -20px;
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: ${brandColor};
    }
  }

  img,
  video {
    display: block;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PostHeader = styled.div`
  position: relative;
  margin-bottom: 80px;
  line-height: 1.6;
  ${underlined}

  &:after {
    bottom: -40px;
  }
`;

const Title = styled.h1`
  color: ${brandColor};
  font-size: 32px;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 10px;
`;

const PostMeta = styled.div`
  display: flex;

  @media screen and (max-width: 370px) {
    display: block;
  }
`;

const MetaSeparator = styled.span`
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;

  @media screen and (max-width: 370px) {
    display: none;
  }
`;

const Date = styled.p`
  margin: 0;
  font-style: italic;
`;

const LinkToEdit = styled.a``;

const Excerpt = styled.p`
  font-style: italic;
`;

const TwitterLink = styled.a`
  color: ${brandColor};
`;
