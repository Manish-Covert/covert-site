import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

function Model() {
  const group = useRef()
  const { scene } = useGLTF('/logo-3d.gltf')

  /* Auto-fit model to fill the camera view on first load */
  useEffect(() => {
    if (!scene) return
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 3.2 / maxDim
    scene.scale.setScalar(scale)
    box.setFromObject(scene)
    box.getCenter(center)
    scene.position.sub(center)
  }, [scene])

  useFrame(() => {
    if (!group.current) return
    mouse.tx += (mouse.x - mouse.tx) * 0.06
    mouse.ty += (mouse.y - mouse.ty) * 0.06
    group.current.rotation.y = mouse.tx * 0.5
    group.current.rotation.x = -mouse.ty * 0.28
  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

function Rig() {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.tx * 0.4 - camera.position.x) * 0.05
    camera.position.y += (-mouse.ty * 0.2 - camera.position.y) * 0.05
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
      camera={{ position: [0, 0, 5], fov: 42 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Rig />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.5} color="#a6f23c" />
      <pointLight position={[0, 4, 3]} intensity={1} color="#38c6e8" />
      <Model />
    </Canvas>
  )
}

useGLTF.preload('/logo-3d.gltf')
