import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { maxHeight } from 'styled-system';
import { Box, Flex, Heading, Text } from '@undataforum/components';
import Img from 'gatsby-image';
import Logo from './Logo';

const HeroImage = styled(Box)`
  ${maxHeight}
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: -1;
`;

const HeroOverlay = styled(Flex)`
  ${maxHeight}
  background-color: rgba(255, 255, 255, 0.8);
  height: 100vh;
`;

const Hero = ({ fluid, ...props }) => (
  <Box css="position: relative;">
    <HeroImage maxHeight={['100vh', '500px']}>
      <Img fluid={fluid} style={{ height: '100%' }} />
    </HeroImage>
    <HeroOverlay
      {...props}
      flexWrap="wrap"
      maxHeight={['100vh', '500px']}
      py={[0, 4, 5]}
    >
      <Flex
        width={[1, 1 / 2, 2 / 5]}
        flexDirection="column"
        justifyContent={['flex-end', 'center']}
        p={4}
      >
        <Logo width="90%" mx="auto" />
      </Flex>

      <Flex
        flexDirection="column"
        justifyContent={['flex-start', 'center']}
        width={[1, 1 / 2, 3 / 5]}
        p={4}
      >
        <Heading
          as="h1"
          color="primary"
          fontSize={[4, 5, 6]}
          lineHeight="title"
          textAlign={['center', 'left']}
          mt={0}
          mx={0}
          mb={[3, 4]}
        >
          UN World Data Forum 2020
        </Heading>
        <Text
          as="p"
          color="primary"
          fontSize={[3, 4, 5]}
          lineHeight="title"
          textAlign={['center', 'left']}
          m={0}
        >
          18-21 October 2020 in Bern, Switzerland
        </Text>
      </Flex>
    </HeroOverlay>
  </Box>
);

Hero.propTypes = {
  fluid: object.isRequired,
};

export default Hero;
