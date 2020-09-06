import App, { AppInitialProps, AppContext } from 'next/app'
import { wrapper } from '../redux/store'
import '../styles/index.css'

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) }
    }
  }

  public render() {
    const { Component, pageProps } = this.props
    return <Component { ...pageProps } />
  }
}

export default wrapper.withRedux(WrappedApp)
