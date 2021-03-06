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
                `gatsby-remark-autolink-headers`,
                 {
                    resolve: `gatsby-remark-table-of-contents`,
                    options: {
                        exclude: "Table of Contents",
                        tight: true,
                        fromHeading: 1,
                        toHeading: 6,
                        className: "table-of-contents"
                    },
                },
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
      resolve: `gatsby-plugin-yandex-metrica`,
      options: {
        trackingId: "56098288",
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        trackHash: true,
        webvisor: true,
      }
    }
  ],
  pathPrefix: '/hows-that-again'
}
