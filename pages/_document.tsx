import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script type='text/javascript' src='//imasdk.googleapis.com/js/sdkloader/ima3.js'></script>
          <script
            data-ad-client='ca-pub-8360012973910726'
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
