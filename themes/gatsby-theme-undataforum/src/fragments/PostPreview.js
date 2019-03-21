import { PostPreview } from '@undataforum/components';
import { graphql } from 'gatsby';

// Proxy component to co-locate GraphQL fragment.
export default PostPreview;

export const query = graphql`
  fragment PostPreview on Mdx {
    id
    excerpt
    frontmatter {
      title
      date(formatString: "MMM DD, YYYY")
      authors
    }
  }
`;
