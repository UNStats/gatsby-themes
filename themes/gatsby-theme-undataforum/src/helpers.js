import React from 'react';
import Img from 'gatsby-image';

// Make queried post compatible with PostPreview.
export const normalizePost = ({
  id,
  fields: { lead, path },
  frontmatter: { title, date, authors },
}) => ({ id, title, date, authors, lead, href: path });

// Make queried profile compatible with ProfilePreview.
export const normalizeProfile = ({
  id,
  fields: { path, slug },
  frontmatter: {
    title,
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
    title,
    name,
    jobtitle,
    organization,
    href: path,
    slug,
  };
};
