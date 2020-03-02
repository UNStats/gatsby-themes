import React from 'react';
import { Box } from 'theme-ui';
import { Footer, SocialIcons } from '@undataforum/components';
import { Logo } from '@undataforum/assets';

const ShadowedFooter = props => {
  return (
    <Footer
      {...props}
      logo={
        <Box
          sx={{
            height: ['height.medium', null, 'height.large'],
            mb: [2, 3],
          }}
        >
          <Logo scaleTo="height" monochrome />
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
          size={[32, 48]}
          variant="inherit"
          mb={[1, 2]}
        />
      }
      variant="primary"
    />
  );
};

export default ShadowedFooter;
