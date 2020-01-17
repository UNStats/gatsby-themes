import React from 'react';
import { object, string, func } from 'prop-types';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
} from '@undataforum/components';
import Img from 'gatsby-image';

const Hero = ({ fluid, title, alt, event, ...props }) => (
  <Container {...props} sx={{ maxWidth: 'width.wide' }}>
    <Grid
      sx={{
        gridTemplateAreas: [
          '"hero" "promobox1" "promobox2"',
          '"hero hero hero promobox1 promobox1" "hero hero hero promobox2 promobox2"',
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
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: ['center', 'flex-start'],
          gridArea: 'promobox1',
          px: [2, 3, 4],
          py: 4,
          variant: 'pairings.primary',
        }}
      >
        <Text
          sx={{
            fontSize: [3, 4, 5],
            fontWeight: 'bold',
            lineHeight: 'heading',
            textAlign: ['center', 'left'],
            mb: [2, 3],
          }}
        >
          Call for session proposals
        </Text>
        <Text as="p" sx={{ textAlign: ['center', 'left'], mb: [3, null, 4] }}>
          The call for session proposals for the United Nations World Data Forum
          2020 is open. Please submit your proposals through 31 January 2020.
        </Text>
        <Button sx={{ variant: 'pairings.branded' }}>
          Submit your proposal
        </Button>
      </Flex>
      <Box
        sx={{
          gridArea: 'promobox2',
          px: [2, 3, 4],
          py: 4,
          variant: 'pairings.secondary',
        }}
      >
        {event()}
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
  // Render function for event to be promoted.
  event: func.isRequired,
};

export default Hero;
