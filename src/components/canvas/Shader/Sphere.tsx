import React, { useEffect, useRef } from 'react'
import {
  ContactShadows,
  Effects,
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { Car } from '../Car'
import { Filters } from '../Filters'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

function Sphere() {
  const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg

  // camera movement
  const orbitControlsRef = useRef(null)

  return (
    <>
      {/* camera */}
      <PerspectiveCamera makeDefault={true} position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(40)}
        maxPolarAngle={angleToRadians(85)}
      />

      {/* sphere */}
      {/* <mesh position={[3, 2, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' metalness={0.6} roughness={0.2} />
      </mesh> */}

      {/* Car */}
      <color attach='background' args={['#15151a']} />
      <Car rotation={[0, Math.PI / 1.5, 0]} position={[0, -1.2, 0]} />

      <Filters />

      <hemisphereLight intensity={0.5} />
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -1.16, 0]}
        scale={15}
        blur={0.5}
        opacity={1}
        far={20}
      />
      <mesh
        scale={4}
        position={[3, -1.161, -1.5]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
      >
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshStandardMaterial color='white' roughness={0.75} />
      </mesh>
      <mesh
        scale={4}
        position={[-3, -1.161, -1]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
      >
        <ringGeometry args={[0.9, 1, 3, 1]} />
        <meshStandardMaterial color='white' roughness={0.75} />
      </mesh>

      {/* floor */}
      {/* <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} rotations={[]} />
        <meshStandardMaterial color='#1ea3d8' />
      </mesh> */}

      {/* ambient light */}
      <ambientLight args={['#ffffff', 0.5]} />

      {/* Directional light */}
      <spotLight
        args={['#ffffff', 1.5, 71, angleToRadians(45), 0.4]}
        position={[-6, 1, 0]}
        castShadow
      />
      <spotLight
        args={['#ffffff', 1.5, 71, angleToRadians(45), 0.4]}
        position={[6, 1, 0]}
        castShadow
      />
      <spotLight
        args={['#ffffff', 1.8, 71, angleToRadians(40), 0.4]}
        position={[0, 1, 6]}
        castShadow
      />
      <spotLight
        args={['#ffffff', 1.8, 71, angleToRadians(40), 0.4]}
        position={[0, 1, -6]}
        castShadow
      />

      {/* Environment */}
      <Environment resolution={512}>
        {/* Ceiling */}
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 9]}
          scale={[10, 1, 1]}
        />
        {/* Sides */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-50, 2, 0]}
          scale={[100, 2, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[50, 2, 0]}
          scale={[100, 2, 1]}
        />
        {/* Key */}
        <Lightformer
          form='ring'
          color='red'
          intensity={10}
          scale={2}
          position={[10, 5, 10]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>
    </>
  )
}

export default Sphere
