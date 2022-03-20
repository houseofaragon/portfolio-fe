import { useMousePosition } from "@/lib/useMousePosition";
import PerlinBlob from "./perlinBlob";

export default function Intro() {  
  const mousePosition = useMousePosition()

  return (
    <div className=''
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 40,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}>
      <div className='mt-20' style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "left" }}>
        <div className="text-left max-w-[400px]">
          <p>Hello, I'm Karen.</p>
          <br />
          <p>
          I'm an artist and software engineer.  I've worked at large companies to 2 person teams, as a Team Leader, Manager, and Individual Contributor.

          My journey into engineering started with Frogger.
          </p>
          <br />
        </div>
        <div style={{ width: 10 }} />
      </div>
      <div style={{ height: 10 }} />
      <div
        className="full"
        style={{
          fontFamily: "'Antonio', sans-serif",
          width: "100%",
          flex: "1 1 0%",
          padding: 0,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
      </div>
      <div
      className="w-full"
        style={{
          pointerEvents: "all",
          pointer: "auto",
          width: "100%",
          padding: 0,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
        <p className="full" style={{ fontSize: '14px',whiteSpace: "nowrap", flex: "1 1 0%" }}>
            You are here 
            x: {mousePosition.x}
            y: {mousePosition.y}
        </p>
        <div style={{ width: 10 }} />
        <p className="full text-center">
          Hi!
        </p>
        <p className="full" style={{ fontSize: '14px', flex: "1 1 0%", lineHeight: "1em", textAlign: "right", color: "black" }}>Based in NY</p>
      </div>
      <PerlinBlob />
    </div>
  )
}
