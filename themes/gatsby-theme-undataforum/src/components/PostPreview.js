import { PostPreview } from '@undataforum/components';
import { graphql } from 'gatsby';

export default PostPreview;

export const query = graphql`
  fragment PostPreview on Mdx {
    id
    fields {
      lead
      path
    }
    frontmatter {
      title
      date(formatString: "MMM DD, YYYY")
      authors
    }
  }
`;
