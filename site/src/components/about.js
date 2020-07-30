import React from 'react';
import { Container, Text } from 'theme-ui';

const About = ({ ...props }) => (
  <Container
    {...props}
    sx={{
      variant: 'layout.narrow',
      fontSize: 3,
      textAlign: 'center',
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
