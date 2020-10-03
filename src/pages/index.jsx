import React from 'react'
import Layout from '../components/layout'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from 'gatsby'

const compareByPath = (a, b) => {
  return a.relativePath < b.relativePath ? -1 : 1
}

export default ({children}) => (
  <Layout>
    <div>
      <Link to={'/cheats'}>cheats</Link>
    </div>
    <div>
      <Link to={'/books'}>books</Link>
    </div>
    <div>
      <Link to={'/video'}>videos</Link>
    </div>
    <div>
      <Link to={'/hardware'}>hardware</Link>
    </div>
  </Layout>
)
