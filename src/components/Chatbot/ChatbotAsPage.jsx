import { useState, useRef, useEffect, Fragment } from "react";
import { chat } from "../../controllers/chatbot.mjs";
import { AlertTriangle } from "lucide-react";
import { Icons } from "../vector/images";

const LoadingDots = () => (
  <div className="flex items-center justify-center space-x-1 h-full min-h-[24px]:">
    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
  </div>
  
);

const Error = () => (
  <span className="flex items-center text-center justify-center space-x-1 text-red-500 ">
    <AlertTriangle size={20} className="mr-2" />
    Error
  </span>
);

const getSuggestionsForUrl = (url) => {
  if (url.includes("inventory")) {
    return [
      "Show me the current inventory.",
      "How do I add a new drug?",
      "What drugs are low in stock?",
    ];
  }
  if (url.includes("orders")) {
    return [
      "Show my recent orders.",
      "How do I place a new order?",
      "Order status updates?",
    ];
  }
  return ["What can you do?", "Help me with this page.", "Contact support."];
};

const formatReplyToHTML = (text) => {
  const escapeHTML = (str) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let escaped = escapeHTML(text);
  return escaped
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
};

const ChatbotAsPage = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setSuggestions(getSuggestionsForUrl(window.location.href));
  }, []);

  const getAllExceptLast = (data) => data.slice(0, -1);

  const handleSend = async (e, text) => {
    if (e) e.preventDefault();
    const messageText = text !== undefined ? text : input.trim();
    if (!messageText) return;
    setSuggestions([]);
    setInput("");
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: messageText },
      { from: "bot", text: "__loading__" },
    ]);

    const response = await chat(messageText);
    if (!response.error) {
      setMessages((msgs) => [
        ...getAllExceptLast(msgs),
        { from: "bot", text: response.data.reply },
      ]);
    }
    if (response.error) {
      setMessages((msgs) => [
        ...getAllExceptLast(msgs),
        { from: "bot", text: "__error__" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 custom-scrollbar">
      {/* Header - Sticky at Top */}
      <header className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold shadow sticky top-0 z-10">
        PharmaOne Assistant
      </header>

      {/* Chat section - Scrollable */}
      <main className="flex-1 overflow-y-auto px-6 my-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "bot" ? (
              <img src={Icons.ai_bot} className="mr-2 h-10 w-10" />
            ) : (
              <Fragment />
            )}
            <div
              className={`px-4 justify-center items-center py-2 rounded-lg max-w-lg text-sm whitespace-pre-wrap ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              {msg.from === "bot" ? (
                msg.text === "__loading__" ? (
                  <LoadingDots />
                ) : msg.text === "__error__" ? (
                  <Error />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatReplyToHTML(msg.text),
                    }}
                  />
                )
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Section: Suggestions + Chatbar (Sticky Bottom) */}
      <div className="bg-white sticky bottom-0 w-full">
        {suggestions.length > 0 && (
          <div className="px-6 py-2 bg-gray-200 flex flex-wrap gap-2 border-t">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(null, s)}
                className="bg-white border border-gray-300 text-gray-800 px-3 py-1 rounded-full text-xs hover:bg-blue-100"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <form
          onSubmit={handleSend}
          className="flex items-center px-6 py-4 border-t bg-white"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotAsPage;
