import React from 'react';
import { Box } from 'theme-ui';
import { DummyLogo, Footer, SocialIcons } from '@undataforum/components';

const FooterProxy = props => {
  return (
    <Footer
      {...props}
      logo={() => (
        <Box sx={{ height: 'height.medium', mb: 1 }}>
          <DummyLogo scaleTo="height" />
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
    />
  );
};

export default FooterProxy;
