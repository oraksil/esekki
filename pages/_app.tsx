import App, { AppInitialProps, AppContext } from 'next/app'
import { wrapper } from '../redux/store'

import { PlayerResolver } from '../lib/context'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'video.js/dist/video-js.min.css'
import '../styles/custom.css'

import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
if (process.env.NEXT_PUBLIC_API_BASEURL) {
  axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_BASEURL}`
}

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
