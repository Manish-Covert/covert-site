import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* Mouse position shared across the component tree */
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

function Model() {
  const group = useRef()
  const { scene } = useGLTF('/logo-3d.gltf')

  useEffect(() => {
    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = false
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!group.current) return
    /* Smooth lerp toward mouse target */
    mouse.tx += (mouse.x - mouse.tx) * 0.06
    mouse.ty += (mouse.y - mouse.ty) * 0.06

    group.current.rotation.y = mouse.tx * 0.45
    group.current.rotation.x = -mouse.ty * 0.25
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

function Rig() {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.tx * 0.3 - camera.position.x) * 0.04
    camera.position.y += (-mouse.ty * 0.15 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroLogo({ containerRef }) {
  useEffect(() => {
    function onMove(e) {
      const el = containerRef?.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [containerRef])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Rig />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#a6f23c" />
      <pointLight position={[0, 4, 3]} intensity={0.8} color="#38c6e8" />
      <Model />
      <Environment preset="city" />
    </Canvas>
  )
}

useGLTF.preload('/logo-3d.gltf')
