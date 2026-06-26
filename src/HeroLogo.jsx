import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false }

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
    camera.position.z = Math.max(fitHeightDist, fitWidthDist) * 0.88
    camera.near = 0.01
    camera.updateProjectionMatrix()
  }, [scene, camera, size])

  useFrame(() => {
    if (!group.current) return
    const target = mouse.active ? mouse.x : 0
    const targetY = mouse.active ? mouse.y : 0
    mouse.tx += (target  - mouse.tx) * 0.06
    mouse.ty += (targetY - mouse.ty) * 0.06
    group.current.rotation.y = mouse.tx * 0.28
    group.current.rotation.x = -mouse.ty * 0.16
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
    const target = mouse.active ? mouse.tx : 0
    const targetY = mouse.active ? mouse.ty : 0
    camera.position.x += (target  * 0.14 - camera.position.x) * 0.05
    camera.position.y += (-targetY * 0.08 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroLogo({ containerRef }) {
  useEffect(() => {
    const el = containerRef?.current
    if (!el) return

    /* Reset position + disable mouse when hero leaves viewport */
    const observer = new IntersectionObserver(
      ([entry]) => {
        mouse.active = entry.isIntersecting
        if (!entry.isIntersecting) {
          mouse.x = 0; mouse.y = 0; mouse.tx = 0; mouse.ty = 0
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    function onMove(e) {
      if (!mouse.active) return
      const rect = el.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
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
