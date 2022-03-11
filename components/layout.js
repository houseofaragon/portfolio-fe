import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Header from './header'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main style={{ padding: "40px"}}>
          <Header />
          <div style={{marginTop: "20px"}}>
            <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "right" }}>
          <p
            style={{
              transform: "rotate3d(0, 0, 1, 90deg) translate3d(200%,10px,0)",
              transformOrigin: "right",
              fontSize: 12,
              fontWeight: "300",
              lineHeight: "100%",
              textAlign: "right",
              color: "black",
              whiteSpace: "nowrap",
            }}>
            I'm happy you're here &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ●
          </p>
        </div>
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
