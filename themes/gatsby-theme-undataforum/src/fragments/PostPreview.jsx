import { PostPreview } from '@undataforum/components';
import { graphql } from 'gatsby';

export default PostPreview;

export const query = graphql`
  fragment PostPreview on Mdx {
    id
    excerpt
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

// Make queried post compatible with PostPreview.
export const normalizePost = ({
  id,
  excerpt,
  fields: { path },
  frontmatter: { title, date, authors },
}) => ({ id, title, date, authors, lead: excerpt, href: path });
