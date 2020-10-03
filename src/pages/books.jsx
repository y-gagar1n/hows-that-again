import React from 'react'
import Layout from '../components/layout'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from 'gatsby'

const compareByPath = (a, b) => {
  return a.relativePath < b.relativePath ? -1 : 1
}

export default ({children, name}) => (
    <StaticQuery 
        query={
            graphql`
              query MdBooksFilesQuery {
                allFile(filter: {relativePath: {regex: "/^books/.*md$/"}}) {
                  edges {
                    node {
                      relativePath
                      extension
                    }
                  }
                }
              }
            `
        }
        render={data => {
              const nodes = data.allFile.edges.map(({ node }) => node)
              return (
                  <Layout>
                        <div>
                      {nodes
                        .sort(compareByPath)
                        .filter(node => node.extension === 'md')
                        .map(node => {
                          const title = node.relativePath.substr(
                            "books/".length,
                            node.relativePath.length - "books/".length - ".md".length
                          )
                          return (
                            <div>
                              <Link to={'/blog/books/' + title}>{title}</Link>
                            </div>
                          )
                        })}
                    </div>
                  </Layout>
              )
        }}
    />
)
