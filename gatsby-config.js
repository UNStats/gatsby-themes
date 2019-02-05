const pkg = require("./package.json");

module.exports = {
  siteMetadata: {
    title: pkg.name,
    description: pkg.description,
    siteUrl: "https://theme.undataforum.org",
    navLinks: [
      {
        href: "/blog",
        text: "Blog"
      },
      {
        href: "/committee",
        text: "Committee"
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"]
      }
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet"
  ]
};
