// import '@graphdl/ui/styles.css'
import { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://cdn.tailwindcss.com" />
      <Component {...pageProps} />
    </>
  )
}
