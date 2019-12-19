import React from 'react';
import { object, string } from 'prop-types';
import { Box, Text } from '@undataforum/components';
import Img from 'gatsby-image';
import { alpha } from '@theme-ui/color';

const Hero = ({ alt, fluid, title, ...props }) => (
  <Box {...props} sx={{ position: 'relative' }}>
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      <Img
        alt={alt}
        title={title}
        fluid={fluid}
        style={{ height: '100%', width: '100%' }}
      />
    </Box>
    <Box
      sx={{
        bg: alpha('background', 0.7),
        px: [3, 4, 5],
        py: [3, 4, 5],
      }}
    >
      <Text
        sx={{ fontSize: [3, 4, 5], fontWeight: 'bold', textAlign: 'center' }}
      >
        United Nations
      </Text>
      <Text
        sx={{
          fontSize: [4, 5, 6],
          fontWeight: 'bold',
          textAlign: 'center',
          mb: [3, null, 4],
        }}
      >
        World Data Forum 2020
      </Text>
      <Text
        sx={{ fontSize: [3, 4, 5], fontWeight: 'bold', textAlign: 'center' }}
      >
        18–21 October 2020
      </Text>
      <Text
        sx={{ fontSize: [2, 3, 4], fontWeight: 'bold', textAlign: 'center' }}
      >
        in Bern, Switzerland
      </Text>
    </Box>
  </Box>
);

Hero.propTypes = {
  alt: string.isRequired,
  fluid: object.isRequired,
  title: string.isRequired,
};

export default Hero;
