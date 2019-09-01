import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <span style={{ margin: 'auto 0' }}>
          <form style={{marginBottom: 0}} method="get" action="https://encrypted.google.com/search">
              <input type="hidden" name="as_sitesearch" value="y-gagar1n.github.io/hows-that-again"/>
              <input type="text" name="as_q"/>
              <input style={{ marginLeft: 5 }} type="submit" value="Search"/>
          </form>
      </span>
    </div>
  </div>
)

export default Header
