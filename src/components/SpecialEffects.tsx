import { Music, Atom } from 'lucide-react';

interface SpecialEffectsProps {
  meowzartActive: boolean;
  meowzartX: number;
  meowzartY: number;
  meowzartSize: number;
  meoweinsteinActive: boolean;
  fish: Array<{
    id: string;
    x: number;
    y: number;
    size: number;
  }>;
}

export const SpecialEffects = ({
  meowzartActive,
  meowzartX,
  meowzartY,
  meowzartSize,
  meoweinsteinActive,
  fish
}: SpecialEffectsProps) => {
  return (
    <>
      {/* Musical notes around Meowzart when ability is active */}
      {meowzartActive && (
        <>
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i * 60 * Math.PI) / 180; // 60 degrees apart
            const radius = meowzartSize * 1.8;
            const x = meowzartX + Math.cos(angle + Date.now() / 800) * radius;
            const y = meowzartY + Math.sin(angle + Date.now() / 800) * radius;
            
            return (
              <div
                key={i}
                className="absolute pointer-events-none z-50 animate-bounce"
                style={{
                  left: x - 16,
                  top: y - 16,
                  transform: `rotate(${(Date.now() / 15 + i * 60)}deg)`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1.5s'
                }}
              >
                <div className="relative">
                  {/* White background for contrast */}
                  <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-80 scale-150"></div>
                  <Music 
                    size={32} 
                    className="relative text-orange-400 font-bold"
                    strokeWidth={3}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 1)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Atom symbols on fish when Meoweinstein's ability is active */}
      {meoweinsteinActive && fish.map(fishItem => (
        <div
          key={`atom-${fishItem.id}`}
          className="absolute pointer-events-none z-50 animate-spin"
          style={{
            left: fishItem.x + fishItem.size / 2 - 16,
            top: fishItem.y - 40,
            animationDuration: '2s'
          }}
        >
          <div className="relative">
            {/* White background for contrast */}
            <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-90 scale-150"></div>
            <Atom 
              size={32} 
              className="relative text-blue-400 font-bold"
              strokeWidth={3}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};