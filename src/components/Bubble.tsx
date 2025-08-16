interface BubbleProps {
  x: number;
  y: number;
  size: number;
  delay: number;
}

export const Bubble = ({ x, y, size, delay }: BubbleProps) => {
  return (
    <div
      className="absolute rounded-full bg-bubble opacity-60 animate-bubble-float pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(200,220,255,0.4))',
        boxShadow: '0 0 10px rgba(255,255,255,0.3)'
      }}
    />
  );
};