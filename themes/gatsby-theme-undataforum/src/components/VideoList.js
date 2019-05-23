import React from 'react';
import { arrayOf, object } from 'prop-types';
import ReactPlayer from 'react-player';
import { Box, GridList, Heading } from '@undataforum/components';

const VideoList = ({ videos, ...props }) => (
  <Box {...props}>
    <Heading as="h1" fontSize={5} color="text" mb={4}>
      Featured Videos
    </Heading>
    <GridList
      gridGap={3}
      gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
      render={({ id }) => (
        <Box
          css={`
            position: relative;
            padding-top: 56.25%;
          `}
          key={id}
        >
          <ReactPlayer
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
  </Box>
);

VideoList.propTypes = {
  videos: arrayOf(object),
};

export default VideoList;
