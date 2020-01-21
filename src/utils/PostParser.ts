export interface PostData {
  html: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  urlToEdit: string;
}

export default class PostParser {
  public static parsePostNode(postNode: Record<string, any>): PostData {
    return {
      html: postNode.html,
      title: postNode.frontmatter.title,
      date: postNode.frontmatter.date,
      slug: postNode.frontmatter.slug,
      excerpt: postNode.frontmatter.excerpt,
      urlToEdit: this.parseFilePathToGithubUrl(postNode.fileAbsolutePath),
    };
  }

  public static parsePostEdges(postEdges: Record<string, any>): PostData[] {
    return postEdges.map(({ node }: any) => this.parsePostNode(node));
  }

  private static parseFilePathToGithubUrl(absoluteFilePath: string): string {
    const relativeFilePath = absoluteFilePath.split('/devlust/')[1];
    return `https://github.com/eddiemf/devlust/blob/develop/${relativeFilePath}`;
  }
}
