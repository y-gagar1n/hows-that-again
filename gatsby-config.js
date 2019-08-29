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
                //'gatsby-remark-images',
                {
                    resolve: 'gatsby-remark-prismjs',
                    options: {
                        aliases: {
                            sh: "bash",
                            cpp: "clike",
                            js: "javascript"
                        }
                    }
                }
            ]
        }
    },
    {
        resolve: 'gatsby-plugin-lunr',
        options: {
            languages: [
                { name: 'en' },
                { name: 'ru' }
            ],
            fields: [
                { name: 'title', store: true, attributes: { boost: 10 } },
                { name: 'body', store: true },
                { name: 'path', store: true }
            ],
            resolvers: {
                MarkdownRemark: {
                    title: node => node.frontmatter.title,
                    body: node => node.rawMarkdownBody,
                    path: node => node.fileAbsolutePath
                }
            },
            filename: 'search_index.json'
        }
    }
  ],
    //pathPrefix: '/hows-that-again'
}
