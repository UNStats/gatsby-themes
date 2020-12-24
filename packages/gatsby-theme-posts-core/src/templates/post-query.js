import { graphql } from 'gatsby';

import PostPage from '../components/post-page';

export default PostPage;

// Do not shadow this file: https://github.com/gatsbyjs/gatsby/issues/23729.

export const query = graphql`
  query($id: String!) {
    post(id: { eq: $id }) {
      ...PostFragment
    }
  }
`;
