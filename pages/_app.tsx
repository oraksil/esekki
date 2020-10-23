import App, { AppInitialProps, AppContext } from 'next/app'
import { wrapper } from '../redux/store'

import { PlayerResolver } from '../pages/helpers/context'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/custom.css'

import _adapter from 'webrtc-adapter'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
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
