import ReactMarkdown from "react-markdown";
import SantaAvatar from "./SantaAvatar";

interface ChatMessageProps {
  role: "user" | "santa";
  content: string;
  isStreaming?: boolean;
}

const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && <SantaAvatar />}
      {isUser && (
        <div className="w-12 h-12 rounded-full bg-christmas-green flex items-center justify-center">
          <span className="text-2xl">👤</span>
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border rounded-bl-sm"
        }`}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => (
                <strong className="text-christmas-gold font-semibold">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li className="text-foreground">{children}</li>,
              h1: ({ children }) => (
                <h1 className="text-xl font-serif text-christmas-gold mb-2">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-serif text-christmas-gold mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-serif text-christmas-gold mb-1">{children}</h3>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-1 py-0.5 rounded text-christmas-cream text-sm">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-christmas-gold pl-3 italic text-muted-foreground">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        {isStreaming && (
          <span className="inline-block w-2 h-4 bg-christmas-gold ml-1 animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
