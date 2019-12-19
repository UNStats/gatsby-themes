import React from 'react';
import { Container, Text } from '@undataforum/components';

const About = ({ ...props }) => (
  <Container
    {...props}
    sx={{
      maxWidth: 'width.narrow',
      fontSize: 3,
      textAlign: 'center',
      px: [2, 3, 4],
    }}
  >
    <Text>
      Tempor nisi veniam deserunt qui deserunt. Nostrud deserunt deserunt aliqua
      ipsum minim irure. Deserunt deserunt mollit consequat do excepteur culpa
      reprehenderit elit. Excepteur ut id ea ea dolor minim non veniam ea
      exercitation cupidatat.
    </Text>
  </Container>
);

export default About;
