import { useState, KeyboardEvent } from "react";
import { Send, Gift, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    onSend(action);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAction("I'd like to ask for a gift from under the tree! 🎁")}
          disabled={disabled}
          className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary text-foreground"
        >
          <Gift className="w-4 h-4 mr-2 text-christmas-gold" />
          Ask for a Gift
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAction("I want to add a present under the tree! 🎄")}
          disabled={disabled}
          className="flex-1 border-christmas-green/30 hover:bg-christmas-green/10 hover:border-christmas-green text-foreground"
        >
          <TreePine className="w-4 h-4 mr-2 text-christmas-green" />
          Add a Present
        </Button>
      </div>
      <div className="flex gap-3 items-end">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell Santa what's on your mind..."
          disabled={disabled}
          className="min-h-[60px] max-h-[120px] resize-none bg-card border-border focus:border-primary focus:ring-primary/20"
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="h-[60px] w-[60px] bg-primary hover:bg-primary/90 glow-red"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
