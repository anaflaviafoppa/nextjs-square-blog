import Alert from './alert'
import Footer from './components/footer/footer'
import Meta from './meta'
import Header from './header';

interface Props {
    labels?: any,
    preview?: any,
    children: any
}

export default function Layout({ preview, children, labels}: Props) {
  return (
    <>
      <Meta />
        <Header labels={labels} />
      <div>
        {/*<Alert preview={preview} />*/}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
