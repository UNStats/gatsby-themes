import React from 'react';
import { object } from 'prop-types';
import { Box, DummyLogo, Flex, Text } from '@undataforum/components';
import Img from 'gatsby-image';

const Hero = ({ fluid, ...props }) => (
  <Box
    {...props}
    sx={{
      height: ['100vh', 6, '40vh'],
      position: 'relative',
      maxHeight: '100vh',
    }}
  >
    <Img
      fluid={fluid}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: -1,
      }}
    />
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: '100%',
      }}
    >
      <DummyLogo height={4} mx="auto" mb={4} />
      <Text
        as="p"
        sx={{
          color: 'primary',
          fontSize: [3, 4, 5],
          lineHeight: 'heading',
          textAlign: 'center',
          m: 0,
        }}
      >
        18-21 October 2020 in Bern, Switzerland
      </Text>
    </Flex>
  </Box>
);

Hero.propTypes = {
  fluid: object.isRequired,
};

export default Hero;
