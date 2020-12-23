import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment EventFragment on Event {
    id
    collection
    title
    startDate
    endDate
    moderators
    speakers
    location
    description {
      body
      text
    }
    registrationLink
    body
    path
    attachments {
      base
      extension
      name
      publicURL
    }
  }
`;
