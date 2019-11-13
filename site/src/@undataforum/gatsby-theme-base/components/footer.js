import React from 'react';
import { Box, Footer, SocialIcons } from '@undataforum/components';
import { Logo } from '@undataforum/assets';

const ShadowedFooter = props => {
  return (
    <Footer
      {...props}
      logo={() => (
        <Box
          sx={{
            height: ['height.medium', null, 'height.large'],
            mb: [2, 3, 4],
          }}
        >
          <Logo scaleTo="height" monochrome />
        </Box>
      )}
      links={[
        { text: 'Contact', href: '/contact/' },
        { text: 'Copyright', href: '/copyright/' },
        { text: 'Privacy Notice', href: '/privacy/' },
        { text: 'Terms of Use', href: '/terms/' },
      ]}
      social={variant => (
        <SocialIcons
          usernames={{
            twitter: 'UNDataForum',
            github: 'UNDataForum',
            email: 'dataforum@un.org',
          }}
          variant={variant}
        />
      )}
      variant="primary"
    />
  );
};

export default ShadowedFooter;
