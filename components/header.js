import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          padding: 40,
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          zIndex: 1
        }}>
        <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: "'Antonio', sans-serif",
              flex: "1 1 0%",
              height: 30,
              fontSize: 30,
              fontWeight: "700",
              lineHeight: "30px",
              color: "black",
              letterSpacing: -2,
            }}>
            <Link href={`/`}>
              <a className="hover:underline">         KAREN ARAGON</a>
            </Link>
          </p>
          <div data-testid="header-menu" style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}>
            <Link href={`/work`}>
              <a className="hover:underline" style={{ flex: "1 1 0%", height: 12, fontSize: 12, lineHeight: "12px", textAlign: "center", color: "black" }}>WORK</a>
            </Link>
            <Link href={`/posts`}>
              <a className="hover:underline" style={{ flex: "1 1 0%", height: 12, fontSize: 12, lineHeight: "12px", textAlign: "center", color: "black" }}>WRITING</a>
            </Link>
            <Link href={`/cv`}>
              <a className="hover:underline" style={{ flex: "1 1 0%", height: 12, fontSize: 12, lineHeight: "12px", textAlign: "center", color: "black" }}>CV</a>
            </Link>
          </div>
          <p style={{ flex: "1 1 0%", height: 30, fontSize: 30, lineHeight: "30px", textAlign: "right", color: "black" }}>⎑</p>
        </div>
      </div>
      <div style={{ height: 60 }} />

    </>
  )
}
