import React, { useState, useEffect, useRef } from "react";
import "./AgentChat.scss";

interface Props {
  isDark: boolean;
}

const AgentChat: React.FC<Props> = ({ isDark }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hi! I’m your Finance Agent. How can I help you today?",
      time: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = {
      type: "user",
      text: userInput,
      time: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const base_url = import.meta.env.VITE_BASE_URL || "localhost:3000";
      const res = await fetch(`${base_url}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const agentReply = data.response;

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: agentReply, time: new Date() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "⚠️ Error: Something went wrong. Try again later.",
          time: new Date(),
        },
      ]);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={`agent-chat-container ${isDark ? "dark" : "light"}`}
    >
      <div className="chat-header">💬 Finance Agent</div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.type === "user" ? "user" : "bot"}`}
          >
            <div className="chat-bubble">
              {msg.text}
              <div className="chat-time">{formatTime(new Date(msg.time))}</div>
            </div>
          </div>
        ))}
        {loading && <div className="typing-indicator">Agent is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !userInput.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AgentChat;
