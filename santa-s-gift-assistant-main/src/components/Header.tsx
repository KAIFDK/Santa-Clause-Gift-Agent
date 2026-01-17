import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="text-center py-6 relative">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Sparkles className="w-6 h-6 text-christmas-gold animate-twinkle" style={{ animationDuration: "2s" }} />
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">
          Santa's Workshop
        </h1>
        <Sparkles className="w-6 h-6 text-christmas-gold animate-twinkle" style={{ animationDuration: "2.5s" }} />
      </div>
      <p className="text-muted-foreground text-sm md:text-base">
        Ask for a gift or add a present under the tree 🎄
      </p>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl opacity-50 hidden md:block">🎁</div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-50 hidden md:block">🎁</div>
    </header>
  );
};

export default Header;
