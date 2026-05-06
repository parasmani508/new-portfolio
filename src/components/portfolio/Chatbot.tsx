import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, Send, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Who is Paras?",
  "What's his tech stack?",
  "Show me his projects",
  "Where does he work?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-paras`;

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm **Paras-AI** — Paras's personal assistant. Ask me anything about his work, skills, or projects.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const send = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: assistantSoFar };
        return copy;
      });
    };

    try {
      const apiMessages = next.map((m) => ({ role: m.role, content: m.content }));
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          toast({ title: "Slow down!", description: "Rate limit reached. Try again shortly." });
        } else if (resp.status === 402) {
          toast({ title: "AI credits exhausted", description: "Please add credits to continue.", variant: "destructive" });
        } else {
          toast({ title: "Something went wrong", description: err.error || "Try again.", variant: "destructive" });
        }
        setLoading(false);
        return;
      }
      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || !line.trim()) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Network error", description: "Could not reach the assistant.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-gradient-primary text-primary-foreground shadow-glow-primary flex items-center justify-center hover:scale-110 transition-transform"
        style={{ height: 52, width: 52 }}
        aria-label="Open chat"
      >
        <Bot size={20} />
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-ping" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto glass rounded-3xl shadow-card flex flex-col overflow-hidden w-[90vw] max-w-[420px] h-[580px] max-h-[85vh]"
            >
            <div className="px-4 py-3 border-b border-border/60 bg-card/50 flex items-center gap-3">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                  <Bot size={14} className="text-primary-foreground" />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Paras-AI</p>
                <p className="text-xs text-muted-foreground font-mono">ask about Paras</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
              {messages.map((m, i) => {
                if (m.role === "assistant" && !m.content) return null;
                return (
                  <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-gradient-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      {m.role === "assistant" ? (
                        <div className="prose prose-sm prose-invert max-w-none prose-p:my-1 prose-strong:text-primary prose-ul:my-1 prose-li:my-0">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {loading &&
                messages[messages.length - 1]?.role === "assistant" &&
                !messages[messages.length - 1].content && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                      <Loader2 size={13} className="animate-spin text-primary" />
                      <span className="text-xs text-muted-foreground">thinking…</span>
                    </div>
                  </div>
                )}

              {messages.length <= 1 && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-3 py-1.5 text-xs rounded-full border border-border bg-card/50 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="p-3 border-t border-border/60 bg-card/50 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Paras…"
                className="flex-1 bg-input rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-10 w-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-glow-primary"
                aria-label="Send"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              </button>
            </form>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
