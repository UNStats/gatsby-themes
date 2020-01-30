import React from 'react';
import { Box, Container, Grid, Text } from 'theme-ui';

const Experience = ({ ...props }) => (
  <Container {...props} sx={{ maxWidth: 'width.wide', px: [2, 3, 4] }}>
    <Grid gap={3} columns={[1, 2, 4]}>
      <Box
        sx={{ textAlign: ['center', 'left'], p: 3, variant: 'pairings.blue' }}
      >
        <Text sx={{ fontSize: 4, fontWeight: 'heading' }}>Labore</Text>
        <Text>
          Eiusmod minim aliqua elit magna cupidatat nulla non eiusmod eiusmod
          elit.
        </Text>
      </Box>
      <Box
        sx={{ textAlign: ['center', 'left'], p: 3, variant: 'pairings.green' }}
      >
        <Text sx={{ fontSize: 4, fontWeight: 'heading' }}>Irure</Text>
        <Text>
          Ipsum incididunt ut cillum amet nostrud et aliquip officia sint
          consequat officia labore.
        </Text>
      </Box>
      <Box
        sx={{ textAlign: ['center', 'left'], p: 3, variant: 'pairings.red' }}
      >
        <Text sx={{ fontSize: 4, fontWeight: 'heading' }}>Clamare</Text>
        <Text>Magna pariatur in ipsum officia velit voluptate proident.</Text>
      </Box>
      <Box
        sx={{ textAlign: ['center', 'left'], p: 3, variant: 'pairings.yellow' }}
      >
        <Text sx={{ fontSize: 4, fontWeight: 'heading' }}>Consequare</Text>
        <Text>
          Voluptate dolore ut deserunt mollit occaecat cupidatat occaecat
          commodo velit id excepteur esse eiusmod.
        </Text>
      </Box>
    </Grid>
  </Container>
);

export default Experience;
