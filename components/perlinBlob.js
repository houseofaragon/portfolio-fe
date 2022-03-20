import { Suspense, useRef } from "react"
import { vertexShader, fragmentShader } from "@/lib/waveShader"
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from "@react-three/drei"
import glsl from 'glslify'
const start = Date.now();

const OPTIONS = {
  perlin: {
    vel: 0.002,
    speed: 0.00050,
    perlins: 1.0,
    decay: 0.10,
    complex: 0.30,
    waves: 20.0,
    eqcolor: 11.0,
    fragment: true,
    redhell: true
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
    },
    fragment: {
      type: "i",
      value: true
    },
    redhell: {
      type: "i",
      value: true
    }
  },
  // Vertex Shader
  glsl(vertexShader),
  // Fragment Shader
  glsl(fragmentShader)
)

extend({ BlobShaderMaterial })

function Blob() {
  const meshRef = useRef()
  const shaderRef = useRef()
  useFrame(({clock}) =>
   {
    if (!meshRef || !meshRef.current) return

    const time = clock.getElapsedTime() * 0.03

    meshRef.current.rotation.y += OPTIONS.perlin.vel;
    meshRef.current.rotation.x = (Math.sin(time * OPTIONS.spin.sinVel) * OPTIONS.spin.ampVel )* Math.PI / 180;
    
    shaderRef.current.uniforms.time.value = OPTIONS.perlin.speed * (Date.now() - start);
    shaderRef.current.uniforms.pointscale.value = OPTIONS.perlin.perlins;
    shaderRef.current.uniforms.decay.value = OPTIONS.perlin.decay;
    shaderRef.current.uniforms.complex.value = OPTIONS.perlin.complex;
    shaderRef.current.uniforms.waves.value = OPTIONS.perlin.waves;
    shaderRef.current.uniforms.eqcolor.value = OPTIONS.perlin.eqcolor;
    shaderRef.current.uniforms.fragment.value = OPTIONS.perlin.fragment;
    shaderRef.current.uniforms.redhell.value = OPTIONS.perlin.redhell;
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronBufferGeometry attach="geometry" args={[3, 5]} />
      <blobShaderMaterial ref={shaderRef} attach="material" eqcolor="0.7" />
    </mesh>
  )
}
// https://codepen.io/vcomics/pen/djqNrm
export default function PerlinBlob() {
  return (
    <Canvas
      camera={{
        fov: 100,
        position: [0,0,6]
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Blob />
        </Suspense>
    </Canvas>
  )
}