import React from 'react'
import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Meta />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}

export default Layout
