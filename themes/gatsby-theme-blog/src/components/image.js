import React from 'react';
import { object, string } from 'prop-types';
import Img from 'gatsby-image';
import { Box } from '@undataforum/components';

const Image = ({ alt, fluid, title, ...props }) => (
  <Box mb={3} {...props}>
    <Img alt={alt} title={title} fluid={fluid} />
  </Box>
);

Image.propTypes = {
  alt: string.isRequired,
  fluid: object.isRequired,
  title: string.isRequired,
};

export default Image;
