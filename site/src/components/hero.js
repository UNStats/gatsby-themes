import React from 'react';
import { object, string, node } from 'prop-types';
import { Box, Container, Flex, Grid, Text } from 'theme-ui';
import Img from 'gatsby-image';

const Hero = ({ fluid, title, alt, highlight, promotion, ...props }) => (
  <Container {...props} sx={{ maxWidth: 'width.wide' }}>
    <Grid
      sx={{
        gridTemplateAreas: [
          '"hero" "highlight" "promotion"',
          '"hero hero hero highlight highlight" "hero hero hero promotion promotion"',
        ],
        gridTemplateColumns: ['1fr', 'repeat(5, 1fr)'],
        gridGap: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          gridArea: 'hero',
          height: '100%',
        }}
      >
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
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: ['flex-start', null, 'flex-end'],
            color: 'background',
            backgroundImage: [
              theme =>
                `linear-gradient(to bottom, ${theme.colors.primary}, transparent 75%  )`,
              null,
              theme =>
                `linear-gradient(to top, ${theme.colors.text}, transparent 75%)`,
            ],
            height: '100%',
            px: [2, 3, 4],
            py: 4,
          }}
        >
          <Text
            sx={{
              fontSize: [3, 4, 5],
              fontWeight: 'bold',
              textAlign: ['center', 'left'],
            }}
          >
            United Nations
          </Text>
          <Text
            sx={{
              fontSize: [4, 5, 6],
              fontWeight: 'bold',
              lineHeight: 'heading',
              textAlign: ['center', 'left'],
              mb: [3, null, 4],
            }}
          >
            World Data Forum 2020
          </Text>
          <Text
            sx={{
              fontSize: [3, 4, 5],
              fontWeight: 'bold',
              textAlign: ['center', 'left'],
            }}
          >
            18–21 October 2020
          </Text>
          <Text
            sx={{
              fontSize: [2, 3, 4],
              fontWeight: 'bold',
              textAlign: ['center', 'left'],
            }}
          >
            Bern, Switzerland
          </Text>
        </Flex>
      </Box>
      <Box
        sx={{
          gridArea: 'highlight',
          px: [2, 3, 4],
          py: 4,
          variant: 'pairings.primary',
        }}
      >
        {highlight}
      </Box>
      <Box
        sx={{
          gridArea: 'promotion',
          px: [2, 3, 4],
          py: 4,
          variant: 'pairings.secondary',
        }}
      >
        {promotion}
      </Box>
    </Grid>
  </Container>
);

Hero.propTypes = {
  // Hero image.
  fluid: object.isRequired,
  // Hero image title.
  title: string.isRequired,
  // Hero image alt text.
  alt: string.isRequired,
  highlight: node.isRequired,
  promotion: node.isRequired,
};

export default Hero;
