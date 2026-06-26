import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef();
  const particleCount = 1800;

  // Generate initial particle positions in a 3D grid/field
  const [positions, initialPositions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const initialPos = new Float32Array(particleCount * 3);
    const spds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Create a wide, deep grid of points
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 20;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initialPos[i * 3] = x;
      initialPos[i * 3 + 1] = y;
      initialPos[i * 3 + 2] = z;

      spds[i] = 0.1 + Math.random() * 0.4;
    }

    return [pos, initialPos, spds];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array;

    // Retrieve mouse position normalized between -1 and 1
    const { x: mouseX, y: mouseY } = state.mouse;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const initialX = initialPositions[idx];
      const initialY = initialPositions[idx + 1];
      const speed = speeds[i];

      // Slow wave drift
      array[idx] = initialX + Math.sin(time * speed + initialY) * 0.3;
      array[idx + 1] = initialY + Math.cos(time * speed + initialX) * 0.3;

      // Mouse influence: Pull particles slightly based on proximity to cursor
      const dx = array[idx] - mouseX * 20;
      const dy = array[idx + 1] - mouseY * 15;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 8) {
        const force = (8 - dist) * 0.04;
        array[idx] += (dx / dist) * force;
        array[idx + 1] += (dy / dist) * force;
      }
    }

    posAttr.needsUpdate = true;

    // Slow overall rotation of the field
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f5ff"
        size={0.065}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#09090b] pointer-events-none overflow-hidden">
      {/* 3D Particle Canvas */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle Glowing Background Gradients */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-pink/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
