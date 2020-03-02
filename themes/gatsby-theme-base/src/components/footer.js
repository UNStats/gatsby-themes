import React from 'react';
import { Box } from 'theme-ui';
import { Footer, SocialIcons } from '@undataforum/components';

import Logo from './logo';

const FooterProxy = props => {
  return (
    <Footer
      {...props}
      logo={
        <Box sx={{ height: 'height.medium', mb: [1, 2] }}>
          <Logo scaleTo="height" />
        </Box>
      }
      links={[
        { text: 'Contact', href: '/contact/' },
        { text: 'Copyright', href: '/copyright/' },
        { text: 'Privacy Notice', href: '/privacy/' },
        { text: 'Terms of Use', href: '/terms/' },
      ]}
      socialIcons={
        <SocialIcons
          platforms={[
            {
              id: 'twitter',
              username: 'UNDataForum',
              title: 'Follow us on Twitter',
            },
            {
              id: 'github',
              username: 'UNDataForum',
              title: 'Follow us on GitHub',
            },
            {
              id: 'email',
              username: 'dataforum@un.org',
              title: 'Send us an email',
            },
          ]}
          size={[24, 32, 48]}
          variant="inherit"
          mb={[1, 2]}
        />
      }
    />
  );
};

export default FooterProxy;
