import React from 'react';
import { Box } from 'theme-ui';

// Shadow this file to customize header.
const Header = (props) => (
  <Box {...props} sx={{ color: 'background', bg: 'primary', p: 4 }}>
    Shadow src/components/header.js of @undataforum/gatsby-theme-base to
    customize this header.
  </Box>
);

export default Header;
