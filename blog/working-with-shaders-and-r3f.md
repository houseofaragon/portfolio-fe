---
title: "Working with Shaders and react-three-fiber"
date: "2024-12-09"
excerpt: "I have been working with Shaders for a while now, and I still find them difficult to grasp."
---

# Working with Shaders and react-three-fiber

I have been working with Shaders for a while now, and I still find them difficult to grasp.

According to [The Book of Shaders](https://thebookofshaders.com/01/):

If you already have experience making drawings with computers, you know that in that process you draw a circle, then a rectangle, a line, some triangles until you compose the image you want. That process is very similar to writing a letter or a book by hand - it is a set of instructions that do one task after another.

Shaders are also a set of instructions, but the instructions are executed all at once for every single pixel on the screen. That means the code you write has to behave differently depending on the position of the pixel on the screen. Like a type press, your program will work as a function that receives a position and returns a color, and when it's compiled it will run extraordinarily fast.

The incredible things is this fact:

- **the instructions are executed all at once for every single pixel on the screen**

I just love everything about shaders. You can see more in action at [ShaderToy](https://www.shadertoy.com/)

But let's get into some code:

## This post walks you through:

- **generating a scene in react-three-fiber**
- **creating a mesh - with a plane geometry and shader material**
- **playing around with the shader code for some dynamic animations**

Note: this post assumes you know how to create a React Application. If you want to get started quickly - you can run

```bash
    npm create vite@latest
```

Docs for scaffolding your [First vite Project are here](https://vite.dev/guide/#scaffolding-your-first-vite-project).


## First lets install some packages we'll need

```bash
yarn add @react-three/fiber @react-three/drei  glslify glsl-noise
```

Create a file called Grid.js Here we will set up the basic elements of creating a r3f (short for react three fiber) scene.

```javascript
import { Canvas } from @react-three/fiber

export default function Grid() {
  return (
    <Canvas>
      <pointLight position=[{10,10,10}] />
      <mesh>
        <planeBufferGeometry args=[{10,10}] />
        <meshStandardMaterial color="gray" />
      </mesh>
    </Canvas>
  )
}
```

You should see a gray square box on the screen.

## Let's add some shader material code

```javascript
import { extend, Canvas } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei
import glsl from 'glslify'

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {},
  // Vertex Shader
  glsl`
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  glsl`
    void main() {
      gl_FragColor = vec4(0.0, 0.4, 1.0, 1.0);
    }
  `
)

extend({ WaveShaderMaterial })

export default function Grid() {
  return (
    <Canvas>
      <pointLight position=[{10,10,10}] />
      <mesh>
        <planeBufferGeometry args=[{10,10}] />
        <waveShaderMaterial />
      </mesh>
    </Canvas>
  )
}
```

# Let's break down some important concepts in the code above

## Uniforms
Uniforms allow us to pass data from our javascript code into our shader code. The shader code consists of both a Vertex and Fragment shader. Examples include passing in mouse position, time, colors, textures, etc.

## Vertex Shader
In a nutshell, the vertex shader takes in attributes then calculates and manipulates the positions of the vertices of a geometry. This shader runs first before the fragment shader.

## Fragment Shader

Where vertex shader deals with vertices, fragment shader handles setting the color of each pixel (or fragment).

```c
void main() {
  gl_Position = projectionMatrix * modelViewMatrix *  vec4(position, 1.0);
}
```

## gl_Position

This is the position of the vertex on the screen

## Matrices

**projectionMatrix**
Transforms collected coordinates and displaces the final clipping space

**modelMatrix**
Applies all transformations related to the mesh (scale, rotation, movement are all contained and applied to position)

**viewMetrix**
Applies all transformations related to the camera so it correlates with the mesh (scale, rotation, movement of the camera are all contained and applied to position)

**modelViewMatrix**
A combination of modelMatrix & viewMatrix

## type vec4
stores 4 values (x,y,z or a) can also take vec2 or vec3

```c
vec4 a = (1.0, 2.0, 3.0, 4.0)
vec2 a = (1.0, 2.0)
vec4 b = (a, 3.0, 4.0)
```

## Let's play around with changing color

Now lets play around passing in a color value from our jsx code set in our uniform object that will be used in our fragment shader. Remember fragment shaders handle coloring the pixels on the screen.

First we'll need to import three

```javascript
import * as THREE from 'three'

```

Update our uniform object to take in a color with black set as default

```c
  {
    uColor: new THREE.Color(0.0, 0.0, 0.0)
  },
```

Then in the jsx code update waveShaderMaterial to take in a uColor prop and pass in a color

```javascript
<waveShaderMaterial  uColor={"pink"}  />
```

## How do we create a gradient?

First we need access to our coordinates for the geometry - those coordinates are uv coordinates - you may have seen this as uv Mapping. Access to uv coordinates are only accessible in vertex shader but for updating color we need a way to access them in our fragment shader. In order to do that we can use the varying type - which allows us to send data from vertex to our fragment shader

```c
varying vec2 vUv; // v tells us this is a varying type

vUv = uv;
```

Now let's use reacts useFrame to play around with animating color

```javascript
// import useRef, Suspense, and useFram

import React, { useRef, Suspense } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'

// create a component to hold our mesh
const Wave = () => {
  const ref = useRef()
  useFrame(({clock}) => {
    return ref.current.uTime = clock.getElapsedTime()
  })

  return (
    <mesh>
      <planeBufferGeometry args={[10,10]} />
      <waveShaderMaterial
        uColor={"pink"}
        ref={ref}
      />
    </mesh>
  )
}

// then update canvas to render Wave component
      <Canvas>
        <pointLight position={[10,10,10]} />
        <Suspense fallback={null}>
          <Wave />
        </Suspense>
      </Canvas>
```

## Playing with uTime for animations

Let's add a uTime to our uniforms. Then we need to update our Fragment Shader to consume uTime

```c
  // Uniforms
  {
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTime: 0
  },
    // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;

    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(sin(vUv.x + uTime) * uColor, 1.0);
    }
  `/
```

Woo! we have an animated gradient. Play around with the values in gl_FragColor. Want it to animate vertically? replace vUv.x with vUv.y

## Now Lets get some motion!

Remember anytime we want to manipulate position of the geometry we do this in the vertex shader.

```c
precision mediump float;

varying vec2 vUv;

uniform float uTime;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
    
 void main() {
    vUv = uv;
    
    vec3 pos = position;
    float noiseFreq = 1.5;
    float noiseAmp = 0.25;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += snoise(noisePos) * noiseAmp;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
```