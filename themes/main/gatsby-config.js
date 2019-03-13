const pkg = require("./package.json");

module.exports = {
  siteMetadata: {
    title: pkg.name,
    description: pkg.description,
    siteUrl: "https://theme.undataforum.org",
    navigation: [
      {
        href: "/about",
        text: "About"
      },
      {
        href: "/committee",
        text: "Committee"
      }
    ]
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    // Install "gatsby-plugin-page-creator" if the theme should be able to generate pages.
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `${__dirname}/src/pages`
    //   }
    // },
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/components/ContainerLayout.jsx")
        }
      }
    }
  ]
};
