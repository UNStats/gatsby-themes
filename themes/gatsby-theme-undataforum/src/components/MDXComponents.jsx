import React from 'react';
import styled from 'styled-components';
import { Heading, Link, Text } from '@undataforum/components';
import Slugger from 'github-slugger';

const slugger = new Slugger();

// Headings link to page anchors and may not use default link styles.
const UnstyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// eslint-disable-next-line
const headingFactory = ({ as, ...defaultProps }) => ({
  // eslint-disable-next-line
  children,
  ...props
}) => {
  slugger.reset();
  const id = slugger.slug(children);
  return (
    <Heading
      displayName="Heading"
      {...defaultProps}
      {...props}
      id={id}
      as={as}
      fontFamily="sans"
      lineHeight="title"
    >
      <UnstyledLink href={`#${id}`}>{children}</UnstyledLink>
    </Heading>
  );
};

const a = props => <Link {...props} />;

const h1 = headingFactory({ as: 'h1', fontSize: 5, mb: 4 });
const h2 = headingFactory({ as: 'h2', fontSize: 4, mb: 3 });
const h3 = headingFactory({ as: 'h3', fontSize: 3, mb: 3 });

const p = props => (
  <Text {...props} as="p" fontFamily="serif" lineHeight="copy" mt={0} mb={3} />
);

export default { a, h1, h2, h3, p };
