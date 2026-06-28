import React from 'react';

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#09090b]">
      {/* Background image container with drift animation */}
      <div 
        className="w-[112vw] h-[125vh] absolute -top-[12.5vh] -left-[6vw]"
        style={{
          animation: 'bg-drift 30s ease-in-out infinite'
        }}
      >
        <img
          src="/assets/images/japanese_robot_bg.png"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          style={{
            objectPosition: '80% 30%',
            filter: 'contrast(1.1) saturate(1.1) brightness(0.65)'
          }}
          alt="Futuristic Japanese Garden Background"
        />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none"
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

      <style>{`
        @keyframes bg-drift {
          0% {
            transform: scale(1.05) translate(0px, 0px) rotate(0deg);
          }
          50% {
            transform: scale(1.1) translate(8px, -5px) rotate(0.4deg);
          }
          100% {
            transform: scale(1.05) translate(0px, 0px) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

