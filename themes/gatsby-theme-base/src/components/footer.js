import React from 'react';
import { DummyLogo, Footer, SocialIcons } from '@undataforum/components';

/*

*/

const FooterProxy = props => {
  return (
    <Footer
      {...props}
      logo={() => (
        <DummyLogo height={['logo.medium', 'logo.large']} my={[2, 3]} />
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
