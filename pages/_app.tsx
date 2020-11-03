import App, { AppInitialProps, AppContext } from 'next/app'
import { wrapper } from '../redux/store'

import { PlayerResolver } from '../lib/context'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'video.js/dist/video-js.min.css'
import '../styles/custom.css'

import _adapter from 'webrtc-adapter'

import axios from 'axios'
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_BASEURL}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    }
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <PlayerResolver>
        <Component {...pageProps} />
      </PlayerResolver>
    )
  }
}

export default wrapper.withRedux(WrappedApp)
