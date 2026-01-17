import React, { useState } from 'react';

interface ChristmasButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Snowflake = ({ delay, left, size }: { delay: number; left: number; size: number }) => (
  <div
    className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{
      left: `${left}%`,
      top: '-10px',
      animation: `snowfall 3s ease-in-out ${delay}s infinite`,
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="text-primary-foreground/80"
    >
      <path
        d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  </div>
);

const Star = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
  </svg>
);

const HollyDecoration = () => (
  <div className="absolute -top-2 -right-2 w-10 h-10 pointer-events-none">
    {/* Holly Leaves */}
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {/* Left leaf */}
      <ellipse
        cx="14"
        cy="20"
        rx="8"
        ry="5"
        transform="rotate(-30 14 20)"
        className="fill-secondary"
      />
      {/* Right leaf */}
      <ellipse
        cx="26"
        cy="20"
        rx="8"
        ry="5"
        transform="rotate(30 26 20)"
        className="fill-secondary"
      />
      {/* Berries */}
      <circle cx="20" cy="14" r="4" className="fill-primary" />
      <circle cx="16" cy="18" r="3" className="fill-primary" />
      <circle cx="24" cy="18" r="3" className="fill-primary" />
      {/* Berry highlights */}
      <circle cx="19" cy="13" r="1" className="fill-primary-foreground/50" />
      <circle cx="15" cy="17" r="0.8" className="fill-primary-foreground/50" />
      <circle cx="23" cy="17" r="0.8" className="fill-primary-foreground/50" />
    </svg>
  </div>
);

const ChristmasButton: React.FC<ChristmasButtonProps> = ({ children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const snowflakes = [
    { delay: 0, left: 10, size: 8 },
    { delay: 0.5, left: 25, size: 10 },
    { delay: 1, left: 45, size: 6 },
    { delay: 1.5, left: 65, size: 9 },
    { delay: 2, left: 80, size: 7 },
    { delay: 0.3, left: 35, size: 8 },
    { delay: 1.2, left: 55, size: 6 },
    { delay: 0.8, left: 90, size: 10 },
  ];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative px-10 py-5 rounded-full overflow-visible transition-all duration-500 ease-out transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
      style={{
        background: 'linear-gradient(145deg, hsl(0 72% 48%), hsl(0 72% 38%))',
        boxShadow: isHovered
          ? '0 12px 40px -8px hsl(0 72% 45% / 0.6), 0 0 40px hsl(0 72% 55% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.2)'
          : '0 8px 32px -8px hsl(0 72% 45% / 0.4), 0 0 20px hsl(0 72% 55% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.15)',
      }}
    >
      {/* Frosted border effect */}
      <div className="absolute inset-0 rounded-full border-2 border-primary-foreground/20 pointer-events-none" />
      
      {/* Inner glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(0 0% 100% / 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Snowflakes */}
      {snowflakes.map((flake, i) => (
        <Snowflake key={i} {...flake} />
      ))}

      {/* Holly decoration */}
      <HollyDecoration />

      {/* Left star decoration */}
      <Star 
        className={`absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-accent transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-110 animate-twinkle' : 'opacity-70 scale-100'
        }`} 
      />

      {/* Right star decoration */}
      <Star 
        className={`absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-accent transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-110 animate-twinkle' : 'opacity-70 scale-100'
        }`}
        style={{ animationDelay: '0.5s' }}
      />

      {/* Button text with shimmer effect */}
      <span 
        className="relative z-10 font-nunito font-bold text-lg tracking-wide text-primary-foreground flex items-center gap-3"
        style={{
          textShadow: '0 2px 4px hsl(0 0% 0% / 0.2)',
        }}
      >
        {/* Small ornament icon */}
        <svg 
          viewBox="0 0 24 24" 
          className={`w-5 h-5 transition-transform duration-500 ${isHovered ? 'rotate-12' : ''}`}
          fill="currentColor"
        >
          <circle cx="12" cy="14" r="8" className="fill-accent" />
          <rect x="10" y="4" width="4" height="4" rx="1" className="fill-accent" />
          <path d="M12 8v2" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="12" cy="14" rx="6" ry="4" className="fill-primary-foreground/10" />
        </svg>
        
        {children}
        
        {/* Candy cane decoration */}
        <svg 
          viewBox="0 0 24 24" 
          className={`w-5 h-5 transition-transform duration-500 ${isHovered ? '-rotate-12' : ''}`}
        >
          <path
            d="M14.5 4C14.5 4 18 4 18 8C18 12 14 12 14 12L6 20"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14.5 4C14.5 4 18 4 18 8C18 12 14 12 14 12L6 20"
            stroke="hsl(0 72% 45%)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>
      </span>

      {/* Bottom frost/snow effect */}
      <div 
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-2 rounded-full opacity-60 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(0 0% 100% / 0.3))',
          filter: 'blur(2px)',
        }}
      />
    </button>
  );
};

export default ChristmasButton;
