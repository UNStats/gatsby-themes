import { graphql } from 'gatsby';

import EventsPage from '../components/events-page';

export default EventsPage;

// Do not shadow this file: https://github.com/gatsbyjs/gatsby/issues/23729.

export const query = graphql`
  query($collection: String!) {
    allEvent(
      sort: { fields: startDate, order: DESC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        ...EventFragment
      }
    }
  }
`;
