import React from 'react';
import { node } from 'prop-types';
import { Heading } from '@undataforum/components';
import styled from 'styled-components';
import { borderColor, borderTop, borderBottom } from 'styled-system';
import { colorType } from '../types';

const HeadingWithBorders = styled(Heading)`
${borderTop}
${borderBottom}
${borderColor}
`;

const DecoratedHeading = ({ children, color = 'text', ...props }) => (
  <HeadingWithBorders
    {...props}
    borderTop="3px solid"
    borderBottom="1px solid"
    borderColor={color}
    color={color}
    py={2}
  >
    {children}
  </HeadingWithBorders>
);

DecoratedHeading.propTypes = {
  children: node.isRequired,
  color: colorType,
};

export default DecoratedHeading;
