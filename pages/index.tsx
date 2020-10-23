import React from 'react'
import { ServerResponse } from 'http'
import { wrapper } from '../redux/store'

const Index = () => {
  return <React.Fragment>Landing.. must not reach here..</React.Fragment>
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ res }: { res: ServerResponse }) => {
    res.writeHead(301, { Location: 'catalog' })
    res.end()
    return {}
  }
)
