import { useStaticQuery, graphql } from 'gatsby';
import { filterNodes } from '@maiertech/gatsby-helpers';

export const useEvents = (filter) => {
  // This static query cannot be restricted to a specific collection of events.
  // This can be done by applying a filter.
  const data = useStaticQuery(graphql`
    query {
      allEvent(
        sort: { fields: [startDate, endDate, title], order: [DESC, ASC, ASC] }
      ) {
        nodes {
          ...EventFragment
        }
      }
    }
  `);

  return filterNodes(data, filter);
};
