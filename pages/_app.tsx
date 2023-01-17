import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css'
import '../styles/global.scss';
import { AnimatePresence } from 'framer-motion'


import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <main className={inter.className}>
          <AnimatePresence           onExitComplete={() => window.scrollTo(0, 0)}
                                     mode="wait" initial={false}>
            <Component {...pageProps} />
          </AnimatePresence>
      </main>
  )
}

export default MyApp
