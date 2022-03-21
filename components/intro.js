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
    <div className='absolute t-0 l-0 w-full h-full p-40'
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
          <p className="bold">Hello, I'm Karen.</p>
          <b>—</b>
          <p>I'm an artist and software engineer.</p>
          <br />
        </div>
        <div style={{ width: 10 }} />
      </div>
      <div style={{ height: 10 }} />
      <div
        className="full"
        style={{
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
      className="w-full z-10 text-[13px] flex flex-row justify-between items-end"
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
          <p className="text-center hidden sm:block">
            Hi!
          </p>
          <div className="flex flex-col justify-right text-right white-space-nowrap">
            <p>I'm in NY and you are here:</p>
            <p className="mt-[-3px]">
              {`{ x: ${mousePosition.x}, y: ${mousePosition.y} }`}
            </p>
          </div>
      </div>
      <Blob hue={hue} wave={wave}/>
    </div>
  )
}
