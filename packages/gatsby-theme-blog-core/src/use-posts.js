import { useStaticQuery, graphql } from 'gatsby';
import { filterNodes } from '@maiertech/gatsby-helpers';

export const usePosts = (filter) => {
  // This static query cannot be restricted to a specific collection of profiles.
  // This can be done by applying a filter.
  const data = useStaticQuery(graphql`
    query {
      allPost(sort: { fields: date, order: DESC }) {
        nodes {
          ...PostFragment
        }
      }
    }
  `);

  return filterNodes(data, filter);
};
