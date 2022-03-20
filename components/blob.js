import React, { useRef, useCallback, useEffect } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useDrag, useHover } from "react-use-gesture";
import { useSpring, a } from "@react-spring/three";

import MarchingLights from "@/components/marching-lights";
import { FRONT, BACK, VERTICES_NUM, easeInOutQuad } from "@/utils/utils";
import Script from "next/script";

function Blob(props) {
  const { position, scale } = props;
  useEffect(() => {

  }, [])
  const ref = useRef();
  const hoverRef = useRef(false);

  const initialScale = scale.map((x) => x / 2);

  const { aspect } = useThree();

  const [spring, set] = useSpring(() => ({
    scale: initialScale,
    position,
    config: { mass: 10, friction: 50, tension: 900 }
  }));

  const bindDrag = useDrag(
    ({ offset: [x, y], down }) =>
      set({
        position: [(0.05 * x) / aspect, -(0.05 * y) / aspect, position[2]]
      }),
    { pointerEvents: true }
  );

  const bindHover = useHover(
    ({ hovering }) => {
      hoverRef.current = hovering;
      set({ scale: hovering ? scale : initialScale });
    },
    {
      pointerEvents: true
    }
  );


  const onFrame = useCallback(function onFrame({ _state, clock }) {
    const time = clock.getElapsedTime();

    // if(!ref.current) {
    //   return
    // }
    ref.current.rotation.x += time / 500;
    ref.current.rotation.y += time / 500;
    ref.current.rotation.z += time / 500;

    const noiseFactor = 2;
    // console.log(ref)
    const positions = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i+1];
      const z = positions[i+2];
      const vector = new THREE.Vector3(x, y, z);

      vector.normalize().multiplyScalar(
        1 +
          0.3 *
            easeInOutQuad(
              Math.sin((2 * Math.PI * time) / 10)
           ) 
            *
           window && window.noise && window.noise.perlin3(
              x * noiseFactor + time,
              y * noiseFactor + time,
              z * noiseFactor + time
            )
      );
    }

    ref.current.geometry.computeVertexNormals();
    ref.current.geometry.normalsNeedUpdate = true;
    ref.current.geometry.verticesNeedUpdate = true;
  }, []);


  useFrame(onFrame);

  return (
    <>
      <Script src="/perlin.js" />
      <MarchingLights blobRef={ref} />
      <a.mesh
        ref={ref}
        scale={scale}
        {...spring}
        // {...bindDrag()}
        {...bindHover()}
        receiveShadow
      >
        <sphereGeometry
          onUpdate={self => self.verticesNeedUpdate = true} 
          attach="geometry"
          args={[1, VERTICES_NUM, VERTICES_NUM]}
        />
        <meshPhysicalMaterial
          attach="material"
          side={THREE.BackSide}
          clipShadows
          metalness={2}
          roughness={0.1}
          color={new THREE.Color(BACK)}
          specular={new THREE.Color(BACK)}
          emissive={new THREE.Color(BACK)}
          emissiveIntensity={0.9}
        />
      </a.mesh>
    </>
  );
}

export default Blob;
