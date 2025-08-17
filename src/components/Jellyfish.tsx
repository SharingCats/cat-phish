import React from 'react';

interface JellyfishProps {
  x: number;
  y: number;
  size: number;
}

const Jellyfish: React.FC<JellyfishProps> = ({ x, y, size }) => {
  return (
    <div
      className="absolute z-10 pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Jellyfish bell/head */}
      <div 
        className="relative w-full h-3/5 rounded-full bg-gradient-to-b from-purple-200/80 via-purple-300/70 to-purple-400/60 shadow-2xl animate-pulse border border-purple-300/50"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.4))'
        }}
      >
        {/* Inner bell pattern */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 rounded-full bg-gradient-radial from-white/30 to-transparent" />
        
        {/* Bioluminescent spots */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-cyan-300 rounded-full animate-pulse opacity-80" />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-70" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-200 rounded-full animate-pulse opacity-90" />
      </div>

      {/* Jellyfish tentacles */}
      <div className="absolute bottom-0 left-0 w-full h-2/5 flex justify-around items-start">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-purple-400/60 to-purple-500/40 animate-pulse opacity-70"
            style={{
              width: '2px',
              height: `${60 + Math.sin(Date.now() * 0.01 + i) * 10}%`,
              transform: `translateX(${Math.sin(Date.now() * 0.005 + i) * 3}px)`,
              animation: `pulse 2s infinite ${i * 0.2}s`,
              borderRadius: '0 0 50% 50%'
            }}
          />
        ))}
      </div>

      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping"
        style={{
          filter: 'blur(15px)',
          transform: 'scale(1.3)'
        }}
      />
      
      {/* Electric/danger aura */}
      <div 
        className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse"
        style={{
          filter: 'blur(20px)',
          transform: 'scale(1.5)',
          animation: 'pulse 1.5s infinite'
        }}
      />
    </div>
  );
};

export default Jellyfish;