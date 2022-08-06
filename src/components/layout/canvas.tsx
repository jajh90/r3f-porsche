import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, Stats } from '@react-three/drei'
import useStore from '@/helpers/store'
import { Suspense, useEffect, useRef } from 'react'
import { Loader } from '../canvas/Loader'
import { Leva } from 'leva'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control.current) {
      const domElement = dom.current
      const originalTouchAction = domElement.style['touch-action']
      domElement.style['touch-action'] = 'none'

      return () => {
        domElement.style['touch-action'] = originalTouchAction
      }
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
      shadows
    >
      {/* <LControl /> */}
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
