import Alert from './alert'
import Footer from './components/footer/footer'
import Meta from './meta'
import Header from './header';
import { motion } from "framer-motion";


interface Props {
    labels?: any,
    preview?: any,
    children: any,
    searchKey?: string,
    CTAHeader: any,
    footer: any,
    allCategories: any,
}

export default function Layout({ preview,searchKey, footer, allCategories,  children, CTAHeader, labels}: Props) {
  return (
    <>
      <Meta />
        <Header searchKey={searchKey} labels={labels} CTAHeader={CTAHeader} />
      <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
              ease: [0.17, 0.67, 0.83, 0.67]
          }}
      >
        {/*<Alert preview={preview} />*/}
        <main>{children}</main>
      </motion.div>
      <Footer content={footer} categories={allCategories} />
    </>
  )
}
