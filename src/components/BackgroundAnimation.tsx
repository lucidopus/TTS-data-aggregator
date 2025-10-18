'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null!)

  const [sphere] = useMemo(() => {
    const sphere = new Float32Array(800 * 3)
    for (let i = 0; i < 800; i++) {
      sphere[i * 3] = (Math.random() - 0.5) * 25
      sphere[i * 3 + 1] = (Math.random() - 0.5) * 25
      sphere[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return [sphere]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
    }
  })

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const temp = new Float32Array(50 * 3)
    for (let i = 0; i < 50; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 15
      temp[i * 3 + 1] = (Math.random() - 0.5) * 15
      temp[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return temp
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#93c5fd"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  )
}

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
      >
        <Stars />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}