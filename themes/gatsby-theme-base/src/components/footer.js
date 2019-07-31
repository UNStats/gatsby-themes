import React from 'react';
import {
  DummyLogo,
  FlexList,
  Footer,
  SocialIcon,
  TwitterIcon,
  GitHubIcon,
} from '@undataforum/components';

const FooterProxy = props => {
  return (
    <Footer
      {...props}
      logo={() => <DummyLogo height={[3, 4]} my={[2, 3]} />}
      links={[
        { text: 'Contact', href: '/contact/' },
        { text: 'Copyright', href: '/copyright/' },
        { text: 'Privacy Notice', href: '/privacy/' },
        { text: 'Terms of Use', href: '/terms/' },
      ]}
      social={() => (
        <FlexList
          render={icon => icon.render()}
          values={[
            {
              render() {
                return (
                  <SocialIcon
                    color="inherit"
                    href="https://github.com/undataforum"
                    render={() => <GitHubIcon width={[32, 48]} p={[1, 2]} />}
                    key="github"
                  />
                );
              },
            },
            {
              render() {
                return (
                  <SocialIcon
                    color="inherit"
                    href="https://twitter.com/undataforum"
                    render={() => <TwitterIcon width={[32, 48]} p={[1, 2]} />}
                    key="twitter"
                  />
                );
              },
            },
          ]}
          mb={[1, 2]}
        />
      )}
    />
  );
};

export default FooterProxy;
