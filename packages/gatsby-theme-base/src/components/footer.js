import React from 'react';
import { Box } from 'theme-ui';

// Shadow this file to customize footer.
const Footer = (props) => (
  <Box {...props} sx={{ color: 'background', bg: 'secondary', p: 4 }}>
    Shadow src/components/footer.js of @undataforum/gatsby-theme-base to
    customize this footer.
  </Box>
);

export default Footer;
