import React from 'react';
import { Box, Container, Grid, Heading, Text } from 'theme-ui';

const Experience = ({ ...props }) => (
  <Container {...props} variant="wide">
    <Grid gap={3} columns={[1, 2, 4]}>
      <Box
        sx={{
          color: 'background',
          bg: 'blue',
          textAlign: ['center', 'left'],
          p: 3,
        }}
      >
        <Heading as="div" sx={{ fontSize: 4, mb: 3 }}>
          Labore
        </Heading>
        <Text as="p">
          Eiusmod minim aliqua elit magna cupidatat nulla non eiusmod eiusmod
          elit.
        </Text>
      </Box>
      <Box
        sx={{
          color: 'background',
          bg: 'green',
          textAlign: ['center', 'left'],
          p: 3,
        }}
      >
        <Heading as="div" sx={{ fontSize: 4, mb: 3 }}>
          Irure
        </Heading>
        <Text as="p">
          Ipsum incididunt ut cillum amet nostrud et aliquip officia sint
          consequat officia labore.
        </Text>
      </Box>
      <Box
        sx={{
          color: 'background',
          bg: 'red',
          textAlign: ['center', 'left'],
          p: 3,
        }}
      >
        <Heading sx={{ fontSize: 4, mb: 3 }}>Clamare</Heading>
        <Text as="p">
          Magna pariatur in ipsum officia velit voluptate proident.
        </Text>
      </Box>
      <Box
        sx={{
          color: 'background',
          bg: 'yellow',
          textAlign: ['center', 'left'],
          p: 3,
        }}
      >
        <Heading sx={{ fontSize: 4, mb: 3 }}>Consequare</Heading>
        <Text as="p">
          Voluptate dolore ut deserunt mollit occaecat cupidatat occaecat
          commodo velit id excepteur esse eiusmod.
        </Text>
      </Box>
    </Grid>
  </Container>
);

export default Experience;
