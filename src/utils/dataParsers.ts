export const parsePostNode = ({ html, frontmatter }: any): Post => ({
  html: html,
  title: frontmatter.title,
  date: frontmatter.date,
  slug: frontmatter.slug,
  excerpt: frontmatter.excerpt,
  image: frontmatter.image,
  thumbnail: frontmatter.thumbnail,
});

export const parsePostsData = (postsData: any): [Post] => {
  return postsData.edges.map(({ node }: any) => parsePostNode(node));
};
