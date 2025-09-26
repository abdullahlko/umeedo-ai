import { createContext, useState, useRef } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]); // { user, ai } objects
  const [loading, setLoading] = useState(false);

  // Ref for scrolling to messages
  const messageRefs = useRef([]);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL

  // Initialize global timeout array
  if (!window.currentTypewriterTimeouts) window.currentTypewriterTimeouts = [];

  const newChat = () => {
    try {
      // Clear all pending typewriter timeouts
      if (window.currentTypewriterTimeouts.length) {
        window.currentTypewriterTimeouts.forEach((timeout) => clearTimeout(timeout));
        window.currentTypewriterTimeouts = [];
      }

      setPrevPrompts([]);
      setInput("");
      setLoading(false);
      messageRefs.current = [];
    } catch (error) {
      console.error("Error in newChat:", error);
      setPrevPrompts([]);
      setInput("");
      setLoading(false);
    }
  };

  const onSent = async (promptArg) => {
    const currentPrompt = promptArg || input;
    if (!currentPrompt.trim()) return;

    const messageIndex = prevPrompts.length;

    setPrevPrompts((prev) => [...prev, { user: currentPrompt, ai: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${SERVER_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: currentPrompt }),
      }); 

      const data = await res.json();
      const reply = data.reply || "";

      let currentText = "";

      reply.split("").forEach((ch, i) => {
        const timeout = setTimeout(() => {
          currentText += ch;

          setPrevPrompts((prev) => {
            const updated = [...prev];
            updated[messageIndex].ai = currentText;
            return updated;
          });

          if (messageRefs.current[messageIndex]) {
            messageRefs.current[messageIndex].scrollIntoView({ behavior: "smooth" });
          }

          // Remove timeout from global array once executed
          window.currentTypewriterTimeouts = window.currentTypewriterTimeouts.filter(
            (t) => t !== timeout
          );
        }, 50 * i);

        window.currentTypewriterTimeouts.push(timeout);
      });

      // Set loading to false after all timeouts finish
      setTimeout(() => setLoading(false), reply.length * 50);
    } catch (err) {
      console.error("Error in onSent:", err);
      setPrevPrompts((prev) => {
        const updated = [...prev];
        updated[messageIndex].ai = "Error: Could not get AI response";
        return updated;
      });
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!loading) onSent();
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    input,
    setInput,
    handleKeyDown,
    messageRefs,
    newChat,
    loading,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
