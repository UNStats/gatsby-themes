module.exports = {
  siteMetadata: {
    title: 'UN World Data Forum',
    siteUrl: 'https://www.undataforum.org',
    description:
      'The 3rd UN World Data Forum will take place from 18-21 October 2020 in Bern, Switzerland.',
    navigation: {
      links: [
        { text: 'About', href: '/about/' },
        {
          text: 'Blog',
          href: '/blog/',
        },
      ],
      button: {
        text: 'Register',
        href: '/register/',
      },
    },
  },
  __experimentalThemes: ['gatsby-theme-undataforum'],
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
