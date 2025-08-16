interface FishProps {
  id: string;
  x: number;
  y: number;
  size: number;
  color: 'orange' | 'yellow' | 'purple' | 'green' | 'coral';
  speed: number;
}

export const Fish = ({ id, x, y, size, color, speed }: FishProps) => {
  // Map colors to proper CSS classes that are defined in the design system
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-fish-orange';
      case 'yellow': return 'bg-fish-yellow';
      case 'purple': return 'bg-fish-purple';
      case 'green': return 'bg-fish-green';
      case 'coral': return 'bg-fish-coral';
      default: return 'bg-fish-orange';
    }
  };

  const bodyColor = getColorClasses(color);
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size * 0.8,
      }}
    >
      {/* Fish Body - more oval/fish-like shape */}
      <div className={`relative w-full h-full ${bodyColor} rounded-full`}
           style={{ 
             borderRadius: '60% 40% 40% 60%',
             transform: 'rotate(-5deg)'
           }}>
        
        {/* Fish Eye */}
        <div className="absolute top-1/4 left-1/5 w-1/4 h-1/3 bg-white rounded-full border border-gray-300">
          <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Fish Mouth */}
        <div className="absolute top-1/2 left-0 w-1/8 h-1/6 bg-black/20 rounded-full"></div>
        
        {/* Fish Scales/Stripes for texture */}
        <div className="absolute top-1/3 left-1/2 w-1/6 h-1/4 bg-black/10 rounded-full"></div>
        <div className="absolute top-1/2 left-2/3 w-1/8 h-1/5 bg-black/10 rounded-full"></div>
        
        {/* Top Fin */}
        <div className={`absolute -top-1/6 left-1/3 w-1/3 h-1/4 ${bodyColor} opacity-80`}
             style={{ 
               clipPath: 'polygon(20% 100%, 50% 0%, 80% 100%)',
               transform: 'rotate(-10deg)'
             }}></div>
        
        {/* Bottom Fin */}
        <div className={`absolute -bottom-1/6 left-1/4 w-1/4 h-1/4 ${bodyColor} opacity-80`}
             style={{ 
               clipPath: 'polygon(20% 0%, 50% 100%, 80% 0%)',
               transform: 'rotate(10deg)'
             }}></div>
      </div>
      
      {/* Fish Tail - separate from body for better shape */}
      <div className={`absolute -right-1/4 top-1/4 w-1/2 h-1/2 ${bodyColor} opacity-90`}
           style={{ 
             clipPath: 'polygon(0 20%, 80% 0%, 100% 50%, 80% 100%, 0 80%)',
             transform: 'rotate(-5deg)'
           }}></div>
    </div>
  );
};