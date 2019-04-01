import { useStaticQuery, graphql } from 'gatsby';
import { normalizeProfile } from '../fragments/ProfilePreview';

// Return normalized profiles.
export default () => {
  const {
    allMdx: { nodes },
  } = useStaticQuery(
    graphql`
      query profiles {
        allMdx(
          filter: { fields: { type: { eq: "profile" } } }
          sort: {
            order: ASC
            fields: [frontmatter___lastName, frontmatter___firstName]
          }
        ) {
          nodes {
            ...ProfilePreview
            ...MediumAvatar
          }
        }
      }
    `
  );
  return nodes.map(normalizeProfile);
};
