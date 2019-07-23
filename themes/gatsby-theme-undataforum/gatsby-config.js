module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: 'content',
      },
    },
    'gatsby-transformer-sharp',
    { resolve: 'gatsby-plugin-sharp', options: { defaultQuality: 75 } },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-undataforum'],
      },
    },
  ],
};
