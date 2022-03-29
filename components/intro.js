import { useState } from "react"
import { useMousePosition } from "@/lib/useMousePosition"
import Blob from "./blob"

function SliderInput({ label, onChange, max = 12 }) {
  return (  
    <div className="pt-1 max-w-[100px]">
      <label htmlFor="customRange" className="text-xs pr-10">{label}</label>
      <input
        min="1"
        max={max}
        type="range"
        className="
        w-full h-0.5 bg-slate-400 rounded-sm outline-none cursor-pointer 
        "
        id="customRange"
        onChange={onChange}
      />
    </div>
  )
}

export default function Intro() {  
  const mousePosition = useMousePosition()

  // values to pass into blob.js shader
  const [hue, setHue] = useState(12.897)
  const [wave, setWave] = useState(15)

  return (
    <div className='t-0 l-0 w-full h-full'
      style={{
        top: 0,
        left: 0,
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}>
      <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "left" }}>
        <div className="pt-5 md:pt-0 text-left max-w-[400px]">
          <p className="bold">Hello, I'm Karen.</p>
          <b>—</b>
          <p>I'm an artist and software engineer.</p>
          <br />
        </div>
      </div>
      <div
      className="absolute bottom-5 md:bottom-10 z-10 text-[13px] flex flex-row justify-between items-end"
        style={{
          pointerEvents: "all",
          pointer: "auto",
          width: "100%",
          padding: 0,
        }}>
          <div>
            <SliderInput label={'Color'} onChange={(e) => {
              console.log(e.target.value)
              setHue(e.target.value)
            }} />
            <SliderInput label={'Waves'} max="100" onChange={(e) => {
              console.log(e.target.value)
              setWave(e.target.value)
            }}/>

          </div>
          <p className="text-center hidden md:block">
            Hi!
          </p>
          <div className="hidden md:block mr-[10vw] md:mr-[10vw] lg:mr-[9vw] flex flex-col justify-right text-right white-space-nowrap">
            <p>I'm in NY and you are here:</p>
            <p className="mt-[-3px]">
              {`{ x: ${mousePosition.x}, y: ${mousePosition.y} }`}
            </p>
          </div>
      </div>
      <div className="fixed w-full h-full p-0 m-0 md:left-[-20px]"
        style={{
          top: "-10px"
        }}
      >
      <Blob hue={hue} wave={wave}/>
      </div>
    </div>
  )
}