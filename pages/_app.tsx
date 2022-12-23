import { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/global.scss';

import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
  )
}

export default MyApp
