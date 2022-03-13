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
              fontFamily: "'Romana-BT-Roman', sans-serif",
              flex: "0.8 1 0%",
              height: "30px",
              fontSize: "2em",
              fontWeight: "700",
              lineHeight: "30px",
              color: "black",
              letterSpacing: -2,
            }}>
            <Link href={`/`}>
              <a   className="hover:underline"> K Aragon</a>
            </Link>
          </p>
          <div data-testid="header-menu" style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}>
            <Link href={`/work`}>
              <a className="hover:underline">WORK</a>
            </Link>
            <Link href={`/posts`}>
              <a className="hover:underline">WRITING</a>
            </Link>
            <Link href={`/cv`}>
              <a className="hover:underline">CV</a>
            </Link>
          </div>
          <p>&#9999;</p>
        </div>
      </div>
      <div style={{ height: 60 }} />

    </>
  )
}
