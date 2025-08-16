import { useState, useEffect, useRef } from 'react';

interface CatFishProps {
  x: number;
  y: number;
  size: number;
  variant?: 'orange' | 'siamese';
}

export const CatFish = ({ x, y, size, variant = 'orange' }: CatFishProps) => {
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const prevX = useRef(x);
  
  useEffect(() => {
    // Track movement direction for sprite flipping based on position change
    if (x > prevX.current) {
      setDirection('right');
      console.log('Moving RIGHT, x:', x, 'prevX:', prevX.current);
    }
    if (x < prevX.current) {
      setDirection('left');
      console.log('Moving LEFT, x:', x, 'prevX:', prevX.current);
    }
    prevX.current = x;
  }, [x]);

  return (
    <div
      className="absolute transition-all duration-100 ease-out pointer-events-none z-20"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size * 0.7,
      }}
    >
      {/* Cat sprite with flip transform */}
      <div 
        className="relative w-full h-full"
        style={{
          transform: direction === 'left' ? 'scaleX(1)' : 'scaleX(-1)'
        }}
      >
        {variant === 'orange' ? (
          // Orange Tabby Cat-Fish
          <>
            {/* Fish Body */}
            <div className="absolute inset-0 bg-gradient-to-r from-catfish-orange via-catfish-orange to-catfish-belly rounded-full">
              {/* Orange stripes */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/6 bg-catfish-stripe rounded-full opacity-70"></div>
              <div className="absolute top-1/2 left-1/3 w-2/5 h-1/8 bg-catfish-stripe rounded-full opacity-60"></div>
              <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/6 bg-catfish-stripe rounded-full opacity-70"></div>
            </div>
            
            {/* Cat Head - separate from body */}
            <div className="absolute -top-1/3 left-1/8 w-3/4 h-2/3 bg-gradient-to-b from-catfish-orange to-catfish-belly rounded-full border-2 border-slate-300 z-40">
              {/* Orange tabby stripes on head */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/8 bg-catfish-stripe rounded-full opacity-70"></div>
              <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/8 bg-catfish-stripe rounded-full opacity-70"></div>
            </div>
            
            {/* Cat Ears */}
            <div className="absolute -top-1/2 left-1/4 w-1/6 h-1/3 bg-catfish-orange rounded-t-full transform rotate-12 border border-slate-300 z-40"></div>
            <div className="absolute -top-1/2 left-1/2 w-1/6 h-1/3 bg-catfish-orange rounded-t-full transform -rotate-12 border border-slate-300 z-40"></div>
            
            {/* Fish Tail */}
            <div 
              className="absolute -right-1/4 top-1/4 w-1/3 h-1/2 bg-gradient-to-r from-catfish-orange to-catfish-belly rounded-r-full"
              style={{ clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0 80%)' }}
            ></div>
            
            {/* Fish Fins */}
            <div className="absolute bottom-0 left-1/3 w-1/4 h-1/3 bg-catfish-belly rounded-b-full opacity-80"></div>
            <div className="absolute top-1/3 left-0 w-1/5 h-1/4 bg-catfish-belly rounded-l-full opacity-70"></div>
          </>
        ) : (
          // Siamese Cat-Fish
          <>
            {/* Fish Body - Off-white/cream */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50 rounded-full border border-stone-200">
              {/* Subtle cream shading */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/6 bg-stone-100 rounded-full opacity-40"></div>
              <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/6 bg-stone-100 rounded-full opacity-40"></div>
            </div>
            
            {/* Cat Head - separate from body with Siamese coloring */}
            <div className="absolute -top-1/3 left-1/8 w-3/4 h-2/3 bg-gradient-to-b from-stone-100 to-amber-50 rounded-full border-2 border-slate-300 z-40">
              {/* Dark Siamese face mask on the head */}
              <div className="absolute top-1/4 left-1/8 w-3/4 h-1/2 bg-gradient-to-b from-slate-800 via-slate-700 to-stone-600 rounded-full opacity-90"></div>
            </div>
            
            {/* Cat Ears - Dark Siamese coloring */}
            <div className="absolute -top-1/2 left-1/4 w-1/6 h-1/3 bg-slate-800 rounded-t-full transform rotate-12 border border-slate-300 z-40"></div>
            <div className="absolute -top-1/2 left-1/2 w-1/6 h-1/3 bg-slate-800 rounded-t-full transform -rotate-12 border border-slate-300 z-40"></div>
            
            {/* Fish Tail - Off-white with dark tip */}
            <div 
              className="absolute -right-1/4 top-1/4 w-1/3 h-1/2 bg-gradient-to-r from-amber-50 to-slate-600 rounded-r-full"
              style={{ clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0 80%)' }}
            ></div>
            
            {/* Fish Fins - Off-white */}
            <div className="absolute bottom-0 left-1/3 w-1/4 h-1/3 bg-stone-100 rounded-b-full opacity-80"></div>
            <div className="absolute top-1/3 left-0 w-1/5 h-1/4 bg-stone-100 rounded-l-full opacity-70"></div>
          </>
        )}
        
        {/* Realistic Cat Face - positioned on the separate head */}
        {/* Cat Eyes - specific colors for each variant */}
        <div className={`absolute -top-1/4 left-1/4 w-1/5 h-1/5 rounded-full z-50 border-2 border-black ${
          variant === 'orange' 
            ? 'bg-gradient-to-b from-orange-200 via-orange-500 to-orange-700' 
            : 'bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800'
        }`}>
          {/* Cat pupil - vertical slit */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/8 h-3/4 bg-black rounded-full"></div>
          {/* Eye highlight */}
          <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-white rounded-full opacity-90"></div>
          {/* Inner eye reflection */}
          <div className="absolute bottom-1/3 left-1/3 w-1/6 h-1/6 bg-white rounded-full opacity-60"></div>
        </div>
        <div className={`absolute -top-1/4 right-1/4 w-1/5 h-1/5 rounded-full z-50 border-2 border-black ${
          variant === 'orange' 
            ? 'bg-gradient-to-b from-orange-200 via-orange-500 to-orange-700' 
            : 'bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800'
        }`}>
          {/* Cat pupil - vertical slit */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/8 h-3/4 bg-black rounded-full"></div>
          {/* Eye highlight */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white rounded-full opacity-90"></div>
          {/* Inner eye reflection */}
          <div className="absolute bottom-1/3 right-1/3 w-1/6 h-1/6 bg-white rounded-full opacity-60"></div>
        </div>
        
        {/* Cat Nose - triangular like real cats */}
        <div className="absolute -top-1/8 left-1/2 transform -translate-x-1/2 w-1/12 h-1/16 bg-pink-400 z-50"
             style={{ 
               clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
               filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))'
             }}>
        </div>
        
        {/* Cat Mouth - realistic "W" shape */}
        <div className="absolute -top-1/16 left-1/2 transform -translate-x-1/2 z-50">
          {/* Center line from nose */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-black opacity-60"></div>
          {/* Left mouth curve */}
          <div className="absolute top-1 -left-1 w-2 h-1 border-b-2 border-black opacity-60 rounded-bl-full"></div>
          {/* Right mouth curve */}
          <div className="absolute top-1 -right-1 w-2 h-1 border-b-2 border-black opacity-60 rounded-br-full"></div>
        </div>
        
        {/* Whisker spots */}
        <div className="absolute -top-1/8 left-1/8 w-1 h-1 bg-slate-600 rounded-full opacity-40 z-50"></div>
        <div className="absolute -top-1/16 left-1/12 w-1 h-1 bg-slate-600 rounded-full opacity-40 z-50"></div>
        <div className="absolute -top-1/8 right-1/8 w-1 h-1 bg-slate-600 rounded-full opacity-40 z-50"></div>
        <div className="absolute -top-1/16 right-1/12 w-1 h-1 bg-slate-600 rounded-full opacity-40 z-50"></div>
        
        {/* Cat Whiskers - more realistic positioning and curve */}
        <div className="absolute -top-1/8 left-0 w-1/3 h-0.5 bg-white opacity-90 z-50 transform origin-right rotate-2"
             style={{ boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute -top-1/16 left-0 w-1/4 h-0.5 bg-white opacity-90 z-50 transform origin-right -rotate-1"
             style={{ boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute -top-1/24 left-0 w-1/3 h-0.5 bg-white opacity-90 z-50 transform origin-right rotate-3"
             style={{ boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute -top-1/8 right-0 w-1/3 h-0.5 bg-white opacity-90 z-50 transform origin-left -rotate-2"
             style={{ boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute -top-1/16 right-0 w-1/4 h-0.5 bg-white opacity-90 z-50 transform origin-left rotate-1"
             style={{ boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute -top-1/24 right-0 w-1/3 h-0.5 bg-white opacity-90 z-50 transform origin-left -rotate-3"
             style={{ boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}></div>
      </div>
      
      {/* Name Label - outside the flipped container */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 pointer-events-none">
        <div className={`text-sm font-bold px-2 py-1 rounded ${
          variant === 'orange' 
            ? 'text-orange-500 bg-black/50' 
            : 'text-blue-300 bg-black/50'
        }`}>
          {variant === 'orange' ? 'Meowzart' : 'Meoweinstein'}
        </div>
      </div>
    </div>
  );
};