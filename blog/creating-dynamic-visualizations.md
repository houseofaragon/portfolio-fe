---
title: "Creating Dynamic Visualizations with Shaders"
date: "2025-02-09"
excerpt: "It all felt like science fiction"
---

# Creating Dynamic Visualizations

I have built many threeJS sites. It's my go to library for artistic experimentations with code. When I play around with sites using WebGL it taps into a part of my brain that reminds me why I became an engineer in the first place - to create dynamic and interactive websites.

## Enter Shaders

Shader code had eluded me for years. Just take a look at some shader code for this noise function to generate this image

```c
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(st*5.0);

    // Use the noise function
    float n = noise(pos);

    gl_FragColor = vec4(vec3(n), 1.0);
}
```

Looking at it now, for me, I can walk through this and make sense of it. But initially, I was very thrown off by it.

I won't get into the technical details since there's already incredible resources out there.

[The Book of Shaders](https://thebookofshaders.com/11/)

## Perlin Noise Shader

```c
export const heightMapFragmentShader = `
#include <common>

uniform vec2 mousePos;
uniform float mouseSize;
uniform float viscosityConstant;

#define deltaTime ( 1.0 / 60.0 )
#define GRAVITY_CONSTANT ( resolution.x * deltaTime * 3.0 )

void main() {

    vec2 cellSize = 1.0 / resolution.xy;

    vec2 uv = gl_FragCoord.xy * cellSize;

    heightmapValue.x == height
    heightmapValue.y == velocity
    vec4 heightmapValue = texture2D( heightmap, uv );

    // Get neighbours
    vec4 north = texture2D( heightmap, uv + vec2( 0.0, cellSize.y ) );
    vec4 south = texture2D( heightmap, uv + vec2( 0.0, - cellSize.y ) );
    vec4 east = texture2D( heightmap, uv + vec2( cellSize.x, 0.0 ) );
    vec4 west = texture2D( heightmap, uv + vec2( - cellSize.x, 0.0 ) );

    float sump = north.x + south.x + east.x + west.x - 4.0 * heightmapValue.x;

    float accel = sump * GRAVITY_CONSTANT;

    // Dynamics
    heightmapValue.y += accel;
    heightmapValue.x += heightmapValue.y * deltaTime;

    // Viscosity
    heightmapValue.x += sump * viscosityConstant;

    // Mouse influence
    float mousePhase = clamp( length( ( uv - vec2( 0.5 ) ) * BOUNDS - vec2( mousePos.x, - mousePos.y ) ) * PI / mouseSize, 0.0, PI );
    heightmapValue.x += cos( mousePhase ) + 1.0;

    gl_FragColor = heightmapValue;
}
`

export const waterVertexShader = `
uniform sampler2D heightmap;

#define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED

    varying vec3 vNormal;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

    vec2 cellSize = vec2( 1.0 / WIDTH, 1.0 / WIDTH );

    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>

    // # include <beginnormal_vertex>
    // Compute normal from heightmap
    vec3 objectNormal = vec3(
        ( texture2D( heightmap, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( heightmap, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
        ( texture2D( heightmap, uv + vec2( 0, - cellSize.y ) ).x - texture2D( heightmap, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,
        1.0 );
    //<beginnormal_vertex>

    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>

#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

    vNormal = normalize( transformedNormal );

#endif

    //# include <begin_vertex>
    float heightValue = texture2D( heightmap, uv ).x;
    vec3 transformed = vec3( position.x, position.y, heightValue );
    //<begin_vertex>

    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <displacementmap_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>

    vViewPosition = - mvPosition.xyz;

    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <shadowmap_vertex>
}
```

## Render the Image 

```javascript
function Blob({ hue, wave}) {
  const meshRef = useRef()

  return (
    <points ref={meshRef}>
      <icosahedronBufferGeometry attach="geometry" args={[2.5, 40]} />
      <blobShaderMaterial ref={shaderRef} attach="material" />
    </points>
  )
}

export default function PerlinBlob({ hue, wave}) {
  return (
    <div className="absolute w-full h-full l-0 t-0 p-0 m-0">
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
```