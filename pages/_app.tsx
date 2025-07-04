import type { AppProps } from 'next/app'
import '../pages/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} 