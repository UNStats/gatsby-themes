import React from 'react';
import { ProfilePreview } from '@undataforum/components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default ProfilePreview;

// Combine ...ProfilePreview with one of ...SmallAvatar, ...MediumAvatar, ...LargeAvatar.
export const query = graphql`
  fragment ProfilePreview on Mdx {
    id
    fields {
      slug
      path
    }
    frontmatter {
      firstName
      lastName
      jobtitle
      organization
    }
  }

  fragment SmallAvatar on Mdx {
    frontmatter {
      avatar {
        childImageSharp {
          fixed(height: 32, width: 32) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }

  fragment MediumAvatar on Mdx {
    frontmatter {
      avatar {
        childImageSharp {
          fixed(height: 64, width: 64) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }

  fragment LargeAvatar on Mdx {
    frontmatter {
      avatar {
        childImageSharp {
          fixed(height: 128, width: 128) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }
`;

// Make queried profile compatible with ProfilePreview.
export const normalizeProfile = ({
  id,
  fields: { path, slug },
  frontmatter: {
    firstName,
    lastName,
    jobtitle,
    organization,
    avatar: {
      childImageSharp: { fixed },
    },
  },
}) => {
  const name = `${firstName} ${lastName}`;
  const avatar = () => (
    <Img style={{ borderRadius: '100%' }} alt={name} fixed={fixed} />
  );
  return {
    id,
    avatar,
    name,
    affiliation: {
      jobtitle,
      organization,
    },
    href: path,
    slug,
  };
};
