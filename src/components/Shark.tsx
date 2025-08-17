import React from 'react';

interface SharkProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Shark: React.FC<SharkProps> = ({ x, y, width, height }) => {
  return (
    <div
      className="absolute z-10 pointer-events-none animate-pulse"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Shark body */}
      <div className="relative w-full h-full">
        {/* Main body */}
        <div 
          className="absolute bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-full shadow-2xl border-2 border-slate-400"
          style={{
            width: '70%',
            height: '60%',
            left: '15%',
            top: '20%'
          }}
        />
        
        {/* Shark head/nose */}
        <div 
          className="absolute bg-gradient-to-r from-slate-500 to-slate-400 rounded-full shadow-lg"
          style={{
            width: '25%',
            height: '40%',
            left: '0%',
            top: '30%'
          }}
        />
        
        {/* Dorsal fin */}
        <div 
          className="absolute bg-slate-600 shadow-lg"
          style={{
            width: '15%',
            height: '40%',
            left: '40%',
            top: '0%',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
        
        {/* Tail fin */}
        <div 
          className="absolute bg-slate-600 shadow-lg"
          style={{
            width: '20%',
            height: '70%',
            right: '0%',
            top: '15%',
            clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)'
          }}
        />
        
        {/* Eye */}
        <div 
          className="absolute bg-red-500 rounded-full shadow-md animate-pulse"
          style={{
            width: '8%',
            height: '15%',
            left: '12%',
            top: '35%'
          }}
        />
        
        {/* Teeth/mouth line */}
        <div 
          className="absolute bg-white opacity-80"
          style={{
            width: '20%',
            height: '2px',
            left: '5%',
            top: '50%'
          }}
        />
      </div>
      
      {/* Warning glow effect */}
      <div 
        className="absolute inset-0 bg-red-500 opacity-20 rounded-full animate-ping"
        style={{
          filter: 'blur(10px)',
          transform: 'scale(1.2)'
        }}
      />
    </div>
  );
};

export default Shark;