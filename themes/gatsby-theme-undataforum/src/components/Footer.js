import React from 'react';
import {
  FlexList,
  Footer,
  GitHubIcon,
  SmartLink,
  TwitterIcon,
} from '@undataforum/components';

const links = [
  { text: 'Contact', href: '/contact' },
  { text: 'Copyright', href: '/copyright' },
  { text: 'Privacy Notice', href: '/privacy' },
  { text: 'Terms of Use', href: '/terms' },
];

const renderGitHubIcon = () => (
  <SmartLink href="https://github.com/UNDataForum" color="inherit" key="github">
    <GitHubIcon width={[32, 48]} p={[1, 2]} />
  </SmartLink>
);

const renderTwitterIcon = () => (
  <SmartLink
    href="https://twitter.com/UNDataForum"
    color="inherit"
    key="twitter"
  >
    <TwitterIcon width={[32, 48]} p={[1, 2]} />
  </SmartLink>
);

const FooterProxy = props => {
  return (
    <Footer
      {...props}
      links={links}
      social={() => (
        <FlexList
          render={icon => icon.render()}
          values={[{ render: renderTwitterIcon }, { render: renderGitHubIcon }]}
          mb={[1, 2]}
        />
      )}
    />
  );
};

export default FooterProxy;
