import React from 'react';
import { ProfilePreview } from '@undataforum/components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default ProfilePreview;

// Query data required for ProfilePreview from MDX files.
// Result does not match ProfilePreview's API.
// Generate avatar sizes small, medium and large.
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
      avatar {
        small: childImageSharp {
          fixed(height: 32, width: 32, quality: 85) {
            ...GatsbyImageSharpFixed
          }
        }
        medium: childImageSharp {
          fixed(height: 64, width: 64, quality: 85) {
            ...GatsbyImageSharpFixed
          }
        }
        large: childImageSharp {
          fixed(height: 128, width: 128, quality: 85) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;

const profileMap = ({
  id,
  fields: { path, slug },
  frontmatter: { firstName, lastName, jobtitle, organization, avatar },
}) => {
  const name = `${firstName} ${lastName}`;
  const smallAvatar = () => (
    <Img
      style={{ borderRadius: '100%' }}
      alt={name}
      fixed={avatar.small.fixed}
    />
  );
  const mediumAvatar = () => (
    <Img
      style={{ borderRadius: '100%' }}
      alt={name}
      fixed={avatar.medium.fixed}
    />
  );
  const largeAvatar = () => (
    <Img
      style={{ borderRadius: '100%' }}
      alt={name}
      fixed={avatar.large.fixed}
    />
  );
  return {
    id,
    avatar: {
      small: smallAvatar,
      medium: mediumAvatar,
      large: largeAvatar,
    },
    name,
    affiliation: {
      jobtitle,
      organization,
    },
    href: path,
    slug,
  };
};

// Make profile queried from MDX compatible with ProfilePreview with small avatar.
export const smallAvatarProfileMap = mdxProfile => {
  const { avatar, ...profile } = profileMap(mdxProfile);
  return { ...profile, avatar: avatar.small };
};

// Make profile queried from MDX compatible with ProfilePreview with medium avatar.
export const mediumAvatarProfileMap = mdxProfile => {
  const { avatar, ...profile } = profileMap(mdxProfile);
  return { ...profile, avatar: avatar.medium };
};

// Make profile queried from MDX compatible with ProfilePreview with large avatar.
export const largeAvatarProfileMap = mdxProfile => {
  const { avatar, ...profile } = profileMap(mdxProfile);
  return { ...profile, avatar: avatar.large };
};
