import * as THREE from 'three'
import React, { useRef, Suspense, useLayoutEffect } from 'react'
import { extend, Canvas, useFrame, useLoader } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'glslify'
import { fragmentShader, vertexShader } from '@/lib/waveShader'

const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTime: 0,
    uTexture: new THREE.Texture()
  },
  // Vertex Shader
  glsl(vertexShader),
  // Fragment Shader
  glsl(fragmentShader)
)

extend({ WaveShaderMaterial })

const Wave = () => {
  const ref = useRef()
  useFrame(({clock}) => {
    return ref.current.uTime = clock.getElapsedTime()
  })

  const [image] = useLoader(THREE.TextureLoader, ['/images/kshack-logo.jpg'])

  return (
    <mesh>
      <sphereBufferGeometry args={[0.3, 0.3, 32, 32]} />
      {/* <planeBufferGeometry args={[0.6, 0.4, 16, 16]} /> */}
      <waveShaderMaterial
        uColor={"pink"}
        ref={ref}
        // wireframe
        uTexture={image}
      />
    </mesh>
  )
}

// https://codepen.io/soju22/pen/eYmaPOK?editors=1112
export default function Grid() {
  return (
    <div className="absolute m-auto w-full h-full">
      <Canvas camera={{
        fov: 10,
        position: [0, 0, 6]
      }}>
        <pointLight color="blue" position={[1,1,1]} />
        <Suspense fallback={null}>
          <Wave />
        </Suspense>
      </Canvas>
    </div>
  )
}