import { Canvas } from '@react-three/fiber'
import { Box, Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei'

const ORANGE = '#FF5A1F'

function FloatingShapes() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={ORANGE} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color={ORANGE} />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.4, 64, 64]}>
          <MeshDistortMaterial color={ORANGE} distort={0.5} speed={2} roughness={0} metalness={0.8} opacity={0.14} transparent />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
        <Sphere args={[2.2, 32, 32]}>
          <meshBasicMaterial color={ORANGE} wireframe opacity={0.05} transparent />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <Torus args={[2.8, 0.025, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
          <meshBasicMaterial color={ORANGE} opacity={0.25} transparent />
        </Torus>
      </Float>

      <Float speed={4} rotationIntensity={3} floatIntensity={3}>
        <Box args={[0.28, 0.28, 0.28]} position={[3, 1, -1]}>
          <meshStandardMaterial color={ORANGE} metalness={1} roughness={0} />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={2}>
        <Box args={[0.18, 0.18, 0.18]} position={[-3, -1, 0]}>
          <meshStandardMaterial color="#FFFFFF" metalness={1} roughness={0} opacity={0.35} transparent />
        </Box>
      </Float>

      <Float speed={3.5} rotationIntensity={1.5} floatIntensity={2.5}>
        <Torus args={[1.2, 0.015, 12, 80]} position={[2.5, -1.5, 0]} rotation={[0.5, 0.3, 0]}>
          <meshBasicMaterial color="#FFFFFF" opacity={0.08} transparent />
        </Torus>
      </Float>
    </>
  )
}

export default function Hero3DScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.25]}>
      <FloatingShapes />
    </Canvas>
  )
}
