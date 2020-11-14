import { useStaticQuery, graphql } from 'gatsby';
import { filterNodes } from '@maiertech/gatsby-helpers';

export const useProfiles = (filter) => {
  // This static query cannot be restricted to a specific collection of profiles.
  // This can be done by applying a filter.
  const data = useStaticQuery(graphql`
    query {
      allProfile(sort: { fields: [lastName, firstName], order: [ASC, ASC] }) {
        nodes {
          ...ProfileFragment
        }
      }
    }
  `);

  return filterNodes(data, filter);
};
