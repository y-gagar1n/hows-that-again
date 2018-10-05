module.exports = {
  siteMetadata: {
    title: 'How\'s that again?',
  },
  plugins: ['gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options:{
        path: `${__dirname}/src/pages/md`,
        name: "markdown-pages"
      }
    },
    'gatsby-transformer-remark'
  ],
  pathPrefix: '/hows-that-again'
}
