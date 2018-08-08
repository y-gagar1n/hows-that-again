import React from 'react'
import Link from 'gatsby-link'

const compareByPath = (a, b) => {
  return a.relativePath < b.relativePath ? -1 : 1
}

const IndexPage = ({ data }) => {
  const nodes = data.allFile.edges.map(({ node }) => node)
  return (
    <div>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
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
  )
}

export const query = graphql`
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

export default IndexPage
