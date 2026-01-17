import Snowflakes from "@/components/Snowflakes";
import Header from "@/components/Header";
import SantaChat from "@/components/SantaChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-night flex flex-col relative overflow-hidden">
      <Snowflakes />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-christmas-red/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-christmas-green/5 to-transparent pointer-events-none" />
      
      {/* Tree silhouettes */}
      <div className="absolute bottom-0 left-4 text-6xl opacity-10 hidden md:block">🌲</div>
      <div className="absolute bottom-0 left-24 text-4xl opacity-10 hidden md:block">🌲</div>
      <div className="absolute bottom-0 right-4 text-6xl opacity-10 hidden md:block">🌲</div>
      <div className="absolute bottom-0 right-24 text-4xl opacity-10 hidden md:block">🌲</div>
      
      <div className="relative z-10 flex flex-col flex-1 px-4 max-w-4xl mx-auto w-full">
        <Header />
        <main className="flex-1 flex flex-col min-h-0 pb-6">
          <div className="flex-1 bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 md:p-6 shadow-xl">
            <SantaChat />
          </div>
        </main>
        <footer className="text-center py-4 text-muted-foreground text-xs">
          <p>Made with ❤️ and holiday magic ✨</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
