import Alert from './alert'
import Footer from './components/footer/footer'
import Meta from './meta'
import Header from './header';

interface Props {
    labels?: any,
    preview?: any,
    children: any,
    searchKey?: string,
    CTAHeader: any,
}

export default function Layout({ preview,searchKey, children, CTAHeader, labels}: Props) {
  return (
    <>
      <Meta />
        <Header searchKey={searchKey} labels={labels} CTAHeader={CTAHeader} />
      <div>
        {/*<Alert preview={preview} />*/}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
