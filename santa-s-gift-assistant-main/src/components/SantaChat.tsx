import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadingIndicator from "./LoadingIndicator";

interface Message {
  id: string;
  role: "user" | "santa";
  content: string;
}

const BACKEND_URL = "http://localhost:3001";

const SantaChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "santa",
      content: "**Ho ho ho! Merry Christmas!** 🎄✨\n\nWelcome to Santa's magical workshop! I'm so delighted you've come to visit.\n\nYou can:\n- **Ask for a gift** from under the tree 🎁\n- **Add a present** for someone special 🌟\n\nWhat would you like to do today, my dear friend?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => `session_${Date.now()}`);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (userMessage: string) => {
    const userMsgId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", content: userMessage },
    ]);
    setIsLoading(true);

    try {
      const isFirstMessage = !sessionId.startsWith("session_initialized_");
      const endpoint = isFirstMessage
        ? `${BACKEND_URL}/api/chat`
        : `${BACKEND_URL}/api/chat/${sessionId}`;

      const method = isFirstMessage ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Santa");
      }

      // Get session ID from response headers on first message
      if (isFirstMessage) {
        const newSessionId = response.headers.get("X-Session-ID");
        if (newSessionId) {
          setSessionId(`session_initialized_${newSessionId}`);
        }
      }

      // Create a new message for Santa's response
      const santaMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: santaMsgId, role: "santa", content: "" },
      ]);
      setIsLoading(false);
      setIsStreaming(true);

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            // Parse SSE format: "data: {...}\n\n"
            const lines = chunk.split("\n");
            lines.forEach((line) => {
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.chunk) {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === santaMsgId
                          ? { ...msg, content: msg.content + data.chunk }
                          : msg
                      )
                    );
                  }
                } catch (e) {
                  console.debug("Parse error (expected):", e);
                }
              }
            });
          }
        }
      }

      setIsStreaming(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setIsStreaming(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "santa",
          content: "**Oh dear!** 🎅\n\nIt seems Santa's magic had a little hiccup. Please try again, and I'll do my best to help you!",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
        <div className="space-y-6 py-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isStreaming={isStreaming && index === messages.length - 1 && msg.role === "santa"}
            />
          ))}
          {isLoading && <LoadingIndicator />}
        </div>
      </ScrollArea>
      <div className="pt-4 border-t border-border mt-4">
        <ChatInput onSend={sendMessage} disabled={isLoading || isStreaming} />
      </div>
    </div>
  );
};

export default SantaChat;
