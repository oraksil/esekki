import React from 'react'
import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  footer?: boolean
  children: React.ReactNode
}

const Layout = ({ footer = true, children }: Props) => {
  return (
    <React.Fragment>
      <Meta />
      <main>{children}</main>
      {footer && <Footer />}
    </React.Fragment>
  )
}

export default Layout
