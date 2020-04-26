import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

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
            url
            logo
            ballLogo
            twitterUsername
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
    titleProps.title = `${site.siteMetadata.title} – Putting all the lust into web development`;
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
          content: title || titleProps.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.url}${site.siteMetadata.logo}`,
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
          name: `twitter:site`,
          content: site.siteMetadata.twitterUsername,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterUsername,
        },
        {
          name: `twitter:title`,
          content: title || titleProps.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${site.siteMetadata.url}${site.siteMetadata.ballLogo}`,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
