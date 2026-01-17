import ChristmasButton from "@/components/ChristmasButton";
import { toast } from "@/hooks/use-toast";

const BackgroundSnowflake = ({ style }: { style: React.CSSProperties }) => (
  <div 
    className="absolute text-primary/10 animate-snowfall pointer-events-none"
    style={style}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="2" />
    </svg>
  </div>
);

const Index = () => {
  const handleClick = () => {
    toast({
      title: "🎄 Merry Christmas!",
      description: "Wishing you joy, peace, and holiday magic!",
    });
  };

  // Generate random snowflakes for background
  const backgroundSnowflakes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      opacity: 0.3 + Math.random() * 0.4,
      transform: `scale(${0.5 + Math.random() * 1})`,
    },
  }));

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(210 40% 96%) 0%, hsl(30 50% 98%) 50%, hsl(210 40% 94%) 100%)',
      }}
    >
      {/* Background snowflakes */}
      {backgroundSnowflakes.map((flake) => (
        <BackgroundSnowflake key={flake.id} style={flake.style} />
      ))}

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

      {/* Main content */}
      <div className="relative z-10 text-center space-y-12 px-4">
        {/* Title with festive styling */}
        <div className="space-y-4">
          <h1 className="font-nunito font-extrabold text-5xl md:text-6xl text-foreground tracking-tight">
            <span className="text-primary">Merry</span>{" "}
            <span className="text-secondary">Christmas</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-md mx-auto">
            Click the button below to spread some holiday cheer! ✨
          </p>
        </div>

        {/* Christmas Button */}
        <div className="flex justify-center animate-float">
          <ChristmasButton onClick={handleClick}>
            Holiday Magic
          </ChristmasButton>
        </div>

        {/* Decorative ornaments */}
        <div className="flex justify-center gap-8 pt-8">
          <div className="w-4 h-4 rounded-full bg-primary animate-twinkle" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 rounded-full bg-secondary animate-twinkle" style={{ animationDelay: '0.3s' }} />
          <div className="w-4 h-4 rounded-full bg-accent animate-twinkle" style={{ animationDelay: '0.6s' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-twinkle" style={{ animationDelay: '0.9s' }} />
          <div className="w-4 h-4 rounded-full bg-secondary animate-twinkle" style={{ animationDelay: '1.2s' }} />
        </div>
      </div>

      {/* Bottom decorative trees */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-8 pb-4 opacity-20 pointer-events-none">
        <svg viewBox="0 0 60 80" className="w-16 h-20 text-secondary fill-current">
          <polygon points="30,0 60,80 0,80" />
        </svg>
        <svg viewBox="0 0 60 80" className="w-12 h-16 text-secondary fill-current">
          <polygon points="30,0 60,80 0,80" />
        </svg>
        <svg viewBox="0 0 60 80" className="w-20 h-24 text-secondary fill-current">
          <polygon points="30,0 60,80 0,80" />
        </svg>
        <svg viewBox="0 0 60 80" className="w-14 h-18 text-secondary fill-current">
          <polygon points="30,0 60,80 0,80" />
        </svg>
        <svg viewBox="0 0 60 80" className="w-16 h-20 text-secondary fill-current">
          <polygon points="30,0 60,80 0,80" />
        </svg>
      </div>
    </div>
  );
};

export default Index;
