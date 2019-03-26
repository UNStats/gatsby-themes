import { PostPreview } from '@undataforum/components';
import { graphql } from 'gatsby';

export default PostPreview;

// Query data required for PostPreview from MDX files.
// Result does not match PostPreview's API.
export const query = graphql`
  fragment PostPreview on Mdx {
    id
    fields {
      path
    }
    frontmatter {
      title
      date(formatString: "MMM DD, YYYY")
      authors
    }
  }
`;

// Intermediate map to make results from above query compatible with ProfilePreview.
export const postMap = ({
  id,
  fields: { path },
  frontmatter: { title, date, authors },
}) => ({ id, title, date, authors, href: path });
