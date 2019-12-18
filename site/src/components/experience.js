import React from 'react';
import { Box, Container, Grid, Text } from '@undataforum/components';

const Experience = () => (
  <Container sx={{ maxWidth: 'width.wide', px: [2, 3, 4], mb: [4, null, 5] }}>
    <Grid gap={[3, 4]} columns={[1, 2, 4]}>
      <Box>
        <Text sx={{ fontSize: 5, fontWeight: 'heading' }}>Labore</Text>
        <Text>
          Eiusmod minim aliqua elit magna cupidatat nulla non eiusmod eiusmod
          elit.
        </Text>
      </Box>
      <Box>
        <Text sx={{ fontSize: 5, fontWeight: 'heading' }}>Irure</Text>
        <Text>
          Ipsum incididunt ut cillum amet nostrud et aliquip officia sint
          consequat officia labore.
        </Text>
      </Box>
      <Box>
        <Text sx={{ fontSize: 5, fontWeight: 'heading' }}>Reprehendere</Text>
        <Text>Magna pariatur in ipsum officia velit voluptate proident.</Text>
      </Box>
      <Box>
        <Text sx={{ fontSize: 5, fontWeight: 'heading' }}>Consequare</Text>
        <Text>
          Voluptate dolore ut deserunt mollit occaecat cupidatat occaecat
          commodo velit id excepteur esse eiusmod.
        </Text>
      </Box>
    </Grid>
  </Container>
);

export default Experience;
