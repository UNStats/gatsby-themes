import React from 'react';
import { object } from 'prop-types';
import { height } from 'styled-system';
import { Box, Flex, Text } from '@undataforum/components';
import Img from 'gatsby-image';
import { Logo } from '@undataforum/tokens';

const Hero = ({ fluid, ...props }) => (
  <Box
    {...props}
    css={`
      ${height}
      position: relative;
      max-height: 100vh;
    `}
    height={['100vh', 6, '40vh']}
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
      css={`
        background-color: rgba(255, 255, 255, 0.8);
        height: 100%;
      `}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Logo height={[4, 4, 5]} mx="auto" mb={4} />
      <Text
        as="p"
        color="primary"
        fontSize={[3, 4, 5]}
        lineHeight="title"
        textAlign="center"
        m={0}
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
