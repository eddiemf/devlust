import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { brandColor } from '../../theme/colors';
import DateFormatter from './DateFormatter';

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

const PostCard = ({ title, date, slug, excerpt }: PostListItemProps) => {
  const dateFormatter = new DateFormatter({ date });
  return (
    <li>
      <PostArticle>
        <PostLink to={`/${slug}`} title={title}>
          <PostHeader>
            <TitleContainer>
              <PostTitle>{title}</PostTitle>
              <PostDate>{dateFormatter.format()}</PostDate>
            </TitleContainer>
          </PostHeader>

          <DescriptionContainer>
            <p>{excerpt}</p>
          </DescriptionContainer>
        </PostLink>
      </PostArticle>
    </li>
  );
};

export default PostCard;

const boxShadow = `box-shadow: 0px 2px 4px 2px rgba(46, 41, 51, 0.06), 0px 2px 4px rgba(71, 63, 79, 0.08);`;
const strongBoxShadow = `box-shadow: 0px 2px 4px 2px rgba(106, 49, 150, .4), 0px 2px 4px rgba(106, 49, 150, 0.4);`;

const PostArticle = styled.article`
  border-radius: 2px;
  transition: all 400ms;
  ${boxShadow}

  &:hover {
    ${strongBoxShadow}
  }
`;

const PostTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 32px;
  line-height: 1.2;
  transition: all 400ms;

  @media screen and (max-width: 767px) {
    font-size: 26px;
  }
`;

const PostLink = styled(Link)`
  display: block;
  padding: 15px;
  color: #333;

  &:hover ${PostTitle} {
    color: ${brandColor};
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
`;

const PostDate = styled.p`
  margin: 0;
  font-size: 16px;
  font-style: italic;
`;

const DescriptionContainer = styled.div`
  p {
    line-height: 1.6;
    font-weight: 300;
  }
`;
