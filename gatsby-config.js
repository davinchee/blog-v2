require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `davinchee`,
    name: `le blog de davinchee`,
    siteUrl: `https://davinchee.dev/`,
    description: `Vincent Chee's blog which contains posts and insights and whatnot.`,
    hero: {
      heading: `hello world. welcome to le blog.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `mailto`,
        url: `mailto:khvincentchee@gmail.com`,
      },
      {
        name: `github`,
        url: `https://github.com/davinchee`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/vincent-kh-chee/`,
      },
      {
        name: `medium`,
        url: `https://medium.com/@dahvinchee`,
      },
      {
        name: `buymeacoffee`,
        url: `https://www.buymeacoffee.com/davinchee`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
  ],
};
