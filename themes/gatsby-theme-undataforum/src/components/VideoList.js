import React from 'react';
import { arrayOf, string } from 'prop-types';
import ReactPlayer from 'react-player';
import { Box, GridList } from '@undataforum/components';
import Heading from './Heading';
import Container from './Container';

const VideoList = ({ videos, ...props }) => (
  <Container {...props}>
    <Heading color="text" mb={4}>
      Featured Videos
    </Heading>
    <GridList
      gridGap={3}
      gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
      render={id => (
        <Box
          css={`
            position: relative;
            padding-top: 56.25%;
          `}
        >
          <ReactPlayer
            key={id}
            style={{ position: 'absolute', top: 0, left: 0 }}
            url={`https://www.youtube.com/watch?v=${id}`}
            width="100%"
            height="100%"
            light
          />
        </Box>
      )}
      values={videos}
    />
  </Container>
);

VideoList.propTypes = {
  videos: arrayOf(string),
};

export default VideoList;
