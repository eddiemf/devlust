import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import { brandColor, brandColorLight } from '../../theme/colors';

interface PostListItemProps {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  thumbnail: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

const PostListItem = ({
  title,
  date,
  slug,
  excerpt,
  thumbnail,
}: PostListItemProps) => {
  const link = `/${slug}`;
  return (
    <li>
      <PostArticle>
        <PostHeader>
          <Link to={link} title={title}>
            <Image
              style={{ display: 'block' }}
              fixed={thumbnail.childImageSharp.fixed}
            />
          </Link>

          <TitleContainer>
            <PostTitle>
              <PostTitleLink to={link} title={title}>
                {title}
              </PostTitleLink>
            </PostTitle>

            <PostDate>
              <PostDateLink to={link} title={title}>
                {date}
              </PostDateLink>
            </PostDate>
          </TitleContainer>
        </PostHeader>

        <DescriptionContainer>
          <p>{excerpt}</p>
        </DescriptionContainer>
      </PostArticle>
    </li>
  );
};

export default PostListItem;
const boxShadow = `box-shadow: 0px 2px 4px 2px rgba(46, 41, 51, 0.06), 0px 2px 4px rgba(71, 63, 79, 0.08);`;

const PostArticle = styled.article`
  padding: 15px;
  border-radius: 2px;
  transition: all 200ms;

  @media screen and (max-width: 767px) {
    ${boxShadow}
  }

  &:hover {
    ${boxShadow}
  }
`;

const PostHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: column;

  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  margin-left: 20px;

  @media screen and (max-width: 767px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;

const PostTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 32px;
  line-height: 1.2;

  @media screen and (max-width: 767px) {
    font-size: 26px;
  }
`;

const PostTitleLink = styled(Link)`
  &:hover {
    color: ${brandColor};
  }
`;

const PostDate = styled.p`
  margin: 0;
  font-size: 16px;
  font-style: italic;
`;

const PostDateLink = styled(Link)`
  &:hover {
    color: ${brandColorLight};
  }
`;

const DescriptionContainer = styled.div`
  p {
    line-height: 1.6;
    font-weight: 300;
  }
`;
