import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import logo from '../../static/devlust.jpg';

interface Meta {
  name: string;
  content: any;
}

interface Props {
  description?: string;
  lang?: string;
  meta?: Meta[];
  title?: string;
}

const SEO: FunctionComponent<Props> = ({
  description = '',
  lang = 'en',
  meta = [],
  title = '',
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const titleProps = {} as any;
  if (title) {
    titleProps.title = title;
    titleProps.titleTemplate = `%s | ${site.siteMetadata.title}`;
  } else {
    titleProps.title = `Putting all the lust into web development | ${site.siteMetadata.title}`;
  }

  return (
    <Helmet
      {...titleProps}
      htmlAttributes={{
        lang,
      }}
      meta={[
        {
          name: `google-site-verification`,
          content: '1wVJrKenhOKmDFZ3vWbY4OXkF2C2A74ak4N0gUo4Bf8',
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: logo,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
