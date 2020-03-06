import { graphql } from 'gatsby';

import EventsPage from '../components/events';

export default EventsPage;

export const query = graphql`
  query($collection: String!) {
    allEvent(
      sort: { fields: startDate, order: DESC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        id
        collection
        title {
          childMdx {
            body
          }
          text
        }
        startDate
        endDate
        displayDate
        duration
        moderators {
          name
        }
        speakers {
          name
        }
        description {
          childMdx {
            body
          }
          text
        }
        registrationLink
        path
      }
    }
  }
`;
