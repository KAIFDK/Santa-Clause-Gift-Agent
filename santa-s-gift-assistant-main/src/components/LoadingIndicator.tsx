const LoadingIndicator = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
        <span className="text-2xl animate-float">🎅</span>
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Santa is thinking</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-christmas-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-christmas-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-christmas-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
