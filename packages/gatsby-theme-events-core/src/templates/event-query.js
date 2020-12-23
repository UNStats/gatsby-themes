import { graphql } from 'gatsby';

import EventPage from '../components/event-page';

export default EventPage;

// Do not shadow this file: https://github.com/gatsbyjs/gatsby/issues/23729.

export const query = graphql`
  query($id: String!) {
    event(id: { eq: $id }) {
      ...EventFragment
    }
  }
`;
