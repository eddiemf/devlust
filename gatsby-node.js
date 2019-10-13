const path = require('path');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const results = await graphql(`
    query Posts {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              isDraft
            }
          }
        }
      }
    }
  `);

  results.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.isDraft) return;

    createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/PostTemplate.tsx'),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
