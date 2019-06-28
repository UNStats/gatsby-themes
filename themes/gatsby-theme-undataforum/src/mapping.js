import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import { Heading, SmartLink, Text } from '@undataforum/components';
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

const LinkedHeading = ({ children, ...props }) => {
  slugger.reset();
  let id;
  id = slugger.slug(children);
  // ID `privacy-notice` causes uBlock Origin selector #privacy-notice to set `display: none`.
  // Change ID to prevent heading `Privacy Notice` from being hidden on privacy page.
  if (id === 'privacy-notice') {
    id = 'privacy';
  }
  return (
    <Heading displayName="Heading" {...props} id={id} lineHeight="title">
      <UnstyledLink href={`#${id}`}>{children}</UnstyledLink>
    </Heading>
  );
};

LinkedHeading.propTypes = {
  children: node,
};

const Anchor = props => <SmartLink {...props} />;

const H1 = ({ children, ...props }) => (
  <LinkedHeading {...props} as="h1" fontSize={5} mb={4}>
    {children}
  </LinkedHeading>
);

H1.propTypes = {
  children: node,
};

const H2 = ({ children, ...props }) => (
  <LinkedHeading {...props} as="h2" fontSize={4} mb={3}>
    {children}
  </LinkedHeading>
);

H2.propTypes = {
  children: node,
};

const H3 = ({ children, ...props }) => (
  <LinkedHeading {...props} as="h3" fontSize={3} mb={3}>
    {children}
  </LinkedHeading>
);

H3.propTypes = {
  children: node,
};

const Paragraph = props => (
  <Text {...props} as="p" lineHeight="copy" mt={0} mb={3} />
);

const mapping = { a: Anchor, h1: H1, h2: H2, h3: H3, p: Paragraph };

export default mapping;
