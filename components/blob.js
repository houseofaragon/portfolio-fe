import { Suspense, useRef } from "react"
import { vertexShader, fragmentShader } from "@/lib/blobShader"
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from "@react-three/drei"
import glsl from 'glslify'
import { OrbitControls } from '@react-three/drei'

const start = Date.now();

const OPTIONS = {
  perlin: {
    vel: 0.002,
    speed: 0.00015,
    perlins: 1.2,
    decay: 0.1,
    complex: 0.3,
    fragment: true,
  },
  spin: {
    sinVel: 0.0,
    ampVel: 80.0,
  }
}

const BlobShaderMaterial = shaderMaterial(
  // Uniforms
  {
    time: {
      type: "f",
      value: 0.0
    },
    pointscale: {
      type: "f",
      value: 0.0
    },
    decay: {
      type: "f",
      value: 0.0
    },
    complex: {
      type: "f",
      value: 0.0
    },
    waves: {
      type: "f",
      value: 0.0
    },
    eqcolor: {
      type: "f",
      value: 0.0
    }
  },
  glsl(vertexShader),
  glsl(fragmentShader)
)

extend({ BlobShaderMaterial })

function Blob({ hue, wave}) {
  const meshRef = useRef()
  const shaderRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef || !meshRef.current) return

    const time = clock.getElapsedTime() * 0.0003

    meshRef.current.rotation.y += OPTIONS.perlin.vel;
    meshRef.current.rotation.x = (Math.sin(time * OPTIONS.spin.sinVel) * OPTIONS.spin.ampVel) * Math.PI / 180;
    shaderRef.current.uniforms.time.value = OPTIONS.perlin.speed * (Date.now() - start);
    shaderRef.current.uniforms.pointscale.value = OPTIONS.perlin.perlins;
    shaderRef.current.uniforms.decay.value = OPTIONS.perlin.decay;
    shaderRef.current.uniforms.complex.value = OPTIONS.perlin.complex;
    shaderRef.current.uniforms.waves.value = wave;
    shaderRef.current.uniforms.eqcolor.value = hue;
  })

  return (
    <points ref={meshRef}>
      <icosahedronBufferGeometry attach="geometry" args={[2.5, 40]} />
      <blobShaderMaterial ref={shaderRef} attach="material" />
    </points>
  )
}

export default function PerlinBlob({ hue, wave}) {
  return (
    <div className="absolute w-full h-full p-0 m-0"
    style={{
      left: "-20px",
      top: "-10px"
    }}
    >
      <Canvas
        camera={{ fov: 55, aspect: 2, zoom: 0.27, near: 1, far: 1000 }}
      >
        <OrbitControls />
        <Suspense fallback={null}>
          <Blob hue={hue} wave={wave} />
        </Suspense>
      </Canvas>
    </div>
  )
}