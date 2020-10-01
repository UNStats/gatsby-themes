import { graphql } from 'gatsby';

import EventPage from '../components/event-page';

export default EventPage;

// Do not shadow this file: https://github.com/gatsbyjs/gatsby/issues/23729.

// Retrieve event with provided event ID.
// Retrieve links to PDFs of presentations.
// Query description as text only, since it is only needed for SEO.
export const query = graphql`
  query($id: String!, $regex: String!) {
    event(id: { eq: $id }) {
      collection
      title {
        text
      }
      displayDate
      duration
      moderators {
        id
        name
        path
        avatar {
          childImageSharp {
            fixed(height: 64, width: 64) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
      speakers {
        id
        name
        path
        avatar {
          childImageSharp {
            fixed(height: 64, width: 64) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
      description {
        text
      }
      registrationLink
      body
    }
    allFile(
      filter: { extension: { eq: "pdf" }, relativePath: { regex: $regex } }
      sort: { fields: [publicURL], order: ASC }
    ) {
      nodes {
        base
        publicURL
      }
    }
  }
`;
