import { graphql } from 'gatsby';
import EventsPage from '@undataforum/gatsby-theme-events/src/components/events-page';

export default EventsPage;

// Shadow this file to remove description from query.
// Shadowing this file triggers a warning about the query not being executed.
export const query = graphql`
  query($collection: String!) {
    allEvent(
      sort: { fields: startDate, order: DESC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        id
        title {
          text
        }
        displayDate
        duration
        moderators {
          name
        }
        speakers {
          name
        }
        registrationLink
        path
      }
    }
  }
`;
