const SantaAvatar = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center glow-red animate-pulse-glow">
        <span className="text-2xl">🎅</span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-christmas-green rounded-full flex items-center justify-center">
        <span className="text-[10px]">🎄</span>
      </div>
    </div>
  );
};

export default SantaAvatar;
