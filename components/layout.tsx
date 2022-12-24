import Alert from './alert'
import Footer from './components/footer/footer'
import Meta from './meta'
import Header from './header';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
        <Header />
      <div className="min-h-screen">
        {/*<Alert preview={preview} />*/}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
