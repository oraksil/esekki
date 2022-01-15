/* eslint-disable no-console */
const env = process.env.NODE_ENV
const dev = env !== 'production'
require('dotenv').config({path: dev ? '.env.local' : '.env.production'})

const express = require('express')
const next = require('next')

const { createProxyMiddleware } = require('http-proxy-middleware')

const proxyOptions = {
  '/public': {
    target: process.env.PUBLIC_PROXY_HOST,
    changeOrigin: true,
  },
}

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
})

const handle = app.getRequestHandler()

let server = undefined
app
  .prepare()
  .then(() => {
    server = express()

    // Set up the proxy.
    Object.keys(proxyOptions).forEach(function (context) {
      server.use(context, createProxyMiddleware(proxyOptions[context]))
    })

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch(e => {
    console.log('An error occurred, unable to start the server')
    console.log(e)
  })
