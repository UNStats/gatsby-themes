import React from 'react';
import { Footer, SocialIcons } from '@undataforum/components';
import { Logo } from '@undataforum/assets';

const ShadowedFooter = props => {
  return (
    <Footer
      {...props}
      logo={() => (
        <Logo
          monochrome
          height={['logo.medium', 'logo.medium', 'logo.large']}
          my={[2, 3]}
        />
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
