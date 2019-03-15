import React from 'react';
import { Flex } from '@undataforum/components';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BackgroundImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: ${props => props.height || '100vh'};
`;

const Hero = props => (
  <Flex
    css="
        position: relative;
      "
    alignItems="center"
  >
    <BackgroundImage {...props} />
  </Flex>
);

export default Hero;
