import * as THREE from 'three'
import React, { useRef, Suspense, useLayoutEffect } from 'react'
import { extend, Canvas, useFrame, useLoader } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'glslify'
import { fragmentShader, vertexShader } from '@/lib/blobShader'

const RippleEffect = (function () {
  function RippleEffect(renderer, width, height) {
    this.renderer = renderer;
    this.width = 512;
    this.height = 512;
    this.delta = new THREE.Vector2(this.width / Math.pow(width, 2), this.height / Math.pow(height, 2));

    this.hMap = new THREE.WebGLRenderTarget(this.width, this.height, { type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false });
    this.hMap1 = new THREE.WebGLRenderTarget(this.width, this.height, { type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false });
    this.fsQuad = new FullScreenQuad();

    this.initShaders();
  }

  // From https://github.com/evanw/webgl-water
  RippleEffect.prototype.initShaders = function () {
    // default vertex shader
    const defaultVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    this.copyMat = new THREE.ShaderMaterial({
      uniforms: { 'tDiffuse': { value: null } },
      vertexShader: defaultVertexShader,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(tDiffuse, vUv);
        }
      `,
    });

    this.updateMat = new THREE.ShaderMaterial({
      uniforms: {
        'tDiffuse': { value: null },
        'delta': new THREE.Uniform(this.delta),
      },
      vertexShader: defaultVertexShader,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 delta;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);

          vec2 dx = vec2(delta.x, 0.0);
          vec2 dy = vec2(0.0, delta.y);
          float average = (
            texture2D(tDiffuse, vUv - dx).r +
            texture2D(tDiffuse, vUv - dy).r +
            texture2D(tDiffuse, vUv + dx).r +
            texture2D(tDiffuse, vUv + dy).r
          ) * 0.25;
          texel.g += (average - texel.r) * 2.0;
          texel.g *= 0.995;
          texel.r += texel.g;

          gl_FragColor = texel;
        }
      `,
    });

    this.dropMat = new THREE.ShaderMaterial({
      uniforms: {
        'tDiffuse': { value: null },
        'center': new THREE.Uniform(new THREE.Vector2()),
        'radius': { value: 0.05 },
        'strength': { value: 0.5 },
      },
      vertexShader: defaultVertexShader,
      fragmentShader: `
        const float PI = 3.1415926535897932384626433832795;
        uniform sampler2D tDiffuse;
        uniform vec2 center;
        uniform float radius;
        uniform float strength;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - vUv) / radius);
          drop = 0.5 - cos(drop * PI) * 0.5;
          texel.r += drop * strength;
          // texel.r = clamp(texel.r, -2.0, 2.0);
          gl_FragColor = texel;
        }
      `,
    });
  };

  RippleEffect.prototype.update = function () {
    this.updateHMap();
  };

  RippleEffect.prototype.updateHMap = function () {
    this.updateMat.uniforms.tDiffuse.value = this.hMap.texture;
    this.renderShaderMat(this.updateMat, this.hMap1);
    this.swapBuffers();
  };

  RippleEffect.prototype.addDrop = function (x, y, radius, strength) {
    this.dropMat.uniforms.tDiffuse.value = this.hMap.texture;
    this.dropMat.uniforms.center.value.set(x, y);
    this.dropMat.uniforms.radius.value = radius;
    this.dropMat.uniforms.strength.value = strength;
    this.renderShaderMat(this.dropMat, this.hMap1);
    this.swapBuffers();
  };

  RippleEffect.prototype.renderBuffer = function (buffer, target) {
    target = target ? target : null;
    this.copyMat.uniforms.tDiffuse.value = buffer.texture;
    this.renderShaderMat(this.copyMat, target);
  };

  RippleEffect.prototype.renderShaderMat = function (mat, target) {
    this.fsQuad.material = mat;
    const oldTarget = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(target);
    this.fsQuad.render(this.renderer);
    this.renderer.setRenderTarget(oldTarget);
  };

  RippleEffect.prototype.swapBuffers = function () {
    const temp = this.hMap;
    this.hMap = this.hMap1;
    this.hMap1 = temp;
  };

  // from https://threejs.org/examples/js/postprocessing/EffectComposer.js
  const FullScreenQuad = (function () {
    const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    const FullScreenQuad = function (material) {
      this._mesh = new THREE.Mesh(geometry, material);
    };

    Object.defineProperty(FullScreenQuad.prototype, 'material', {
      get: function () { return this._mesh.material; },
      set: function (value) { this._mesh.material = value; }
    });

    Object.assign(FullScreenQuad.prototype, {
      render: function (renderer) {
        renderer.render(this._mesh, camera);
      }
    });

    return FullScreenQuad;
  })();

  return RippleEffect;
})();

const WaterWave = () => {
  const gridWidth = 500
  const gridHeight = 500
  const pSize = 1;
  const gridWHeight = 500
  let nx = Math.round(gridWidth / 5)
  let ny = Math.round(gridHeight / 50);

  let [ripple] = useMemo(() => [new RippleEffect()])

  const onBeforeCompile = (shader) => {
    shader.uniforms.hmap = { 
      value: ripple.hMap.texture 
    };
    shader.vertexShader = "uniform sampler2D hmap;\n" + shader.vertexShader;

    const token = `#include <begin_vertex>`;
    const customTransform = `
      vec3 transformed = vec3(position);
      vec4 info = texture2D(hmap, uv);
      transformed.z = 20. * info.r;
      `;
    shader.vertexShader = shader.vertexShader.replace(token, customTransform);
  }

  let [uvX] = useMemo(() => {
    let dy = gridWHeight / ny;

    for (let j = 0; j <= ny; j++) {
      const uvH = pSize / gridWHeight;
      const uvY = j / ny;
      const uvs = geometry.attributes.uv.array;
      for (let i = 0; i < uvs.length; i += 2) {
        uvs[i + 1] = (uvs[i + 1] == 0) ? uvY - uvH : uvY + uvH;
      }
    }

    return [uvX]
  })

  const xPlaneRef = useRef()
  const yPlaneRef = useRef()

  // https://stackoverflow.com/questions/68061538/difficulty-creating-basic-line-react-three-fiber-and-typescript
  return (
    <>
      <mesh ref="xPlaneRef">
        <planeBufferGeometry args={[gridWidth, 1, nx, 1]}
        />
        <meshBasicMaterial
          color={"gray"}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
      <mesh ref="xPlaneRef">
        <planeBufferGeometry args={[gridWidth, 1, nx, 1]}
        />
        <meshBasicMaterial
          color={"gray"}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
    </>
  )
}

// https://codepen.io/soju22/pen/eYmaPOK?editors=1112
export default function Water() {
  return (
    <div className="absolute m-auto w-full h-full">
      <Canvas camera={{
        fov: 10,
        position: [0, 0, 5]
      }}>
        <pointLight color="blue" position={[1,1,1]} />
        <Suspense fallback={null}>
          <WaterWave />
        </Suspense>
      </Canvas>
    </div>
  )
}