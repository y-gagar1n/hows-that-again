import React from 'react'
import Layout from '../components/Layout'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from 'gatsby'

const compareByPath = (a, b) => {
  return a.relativePath < b.relativePath ? -1 : 1
}

export default ({children}) => (
    <StaticQuery 
        query={
            graphql`
              query MdFilesQuery {
                allFile {
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
                            0,
                            node.relativePath.length - 3
                          )
                          return (
                            <div>
                              <Link to={'/blog/' + title}>{title}</Link>
                            </div>
                          )
                        })}
                    </div>
                  </Layout>
              )
        }}
    />
)
