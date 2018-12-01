module.exports = {
  siteMetadata: {
    title: 'How\'s that again?',
  },
    plugins: ['gatsby-plugin-react-helmet', 
              'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options:{
        path: `${__dirname}/src/pages/md`,
        name: "markdown-pages"
      }
    },
    {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            'gatsby-remark-images',
            {
              resolve: 'gatsby-remark-toc',
              options: {
                header: 'Содержание', // the custom header text
                include: [
                  '**/*.md' // an include glob to match against
                ]
              }
            }
          ]
        }
    }
  ],
  pathPrefix: '/hows-that-again'
}
