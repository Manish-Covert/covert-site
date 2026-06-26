import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

function Model() {
  const group = useRef()
  const { scene } = useGLTF('/logo-3d.gltf')
  const { camera, size } = useThree()

  useEffect(() => {
    if (!scene) return

    /* Compute bounding sphere and fit camera so the model fills the canvas */
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    const sphere = new THREE.Sphere()
    box.getBoundingSphere(sphere)
    box.getCenter(center)

    /* Center the model at origin */
    scene.position.sub(center)

    /* Move camera back so the sphere exactly fills the fov */
    const fovRad = (camera.fov * Math.PI) / 180
    const aspect = size.width / size.height
    const fitHeightDist = sphere.radius / Math.tan(fovRad / 2)
    const fitWidthDist  = sphere.radius / (Math.tan(fovRad / 2) * aspect)
    /* Use 88% of the tighter dimension so it fills without clipping */
    camera.position.z = Math.max(fitHeightDist, fitWidthDist) * 0.88
    camera.near = 0.01
    camera.updateProjectionMatrix()
  }, [scene, camera, size])

  useFrame(() => {
    if (!group.current) return
    mouse.tx += (mouse.x - mouse.tx) * 0.025
    mouse.ty += (mouse.y - mouse.ty) * 0.025
    group.current.rotation.y = mouse.tx * 0.22
    group.current.rotation.x = -mouse.ty * 0.12
  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

function Rig() {
  const { camera } = useThree()
  const baseZ = useRef(null)
  useFrame(() => {
    if (baseZ.current === null) baseZ.current = camera.position.z
    camera.position.x += (mouse.tx * 0.12 - camera.position.x) * 0.04
    camera.position.y += (-mouse.ty * 0.07 - camera.position.y) * 0.04
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
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [containerRef])

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 42 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Rig />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]}  intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.5} color="#a6f23c" />
      <pointLight position={[0, 4, 3]} intensity={1.1} color="#38c6e8" />
      <Model />
    </Canvas>
  )
}

useGLTF.preload('/logo-3d.gltf')
