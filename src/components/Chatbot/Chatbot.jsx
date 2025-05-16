import { useState, useRef, useEffect } from "react";
import { chat } from "../../controllers/chatbot.mjs";
import { Icons } from "../vector/images";

const getSuggestionsForUrl = (url) => {
  // Add your own logic for different URLs
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
  // Default suggestions
  return ["What can you do?", "Help me with this page.", "Contact support."];
};

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hello! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const messagesEndRef = useRef(null);
    
    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, open]);
    
    useEffect(() => {
        if (open) {
            setSuggestions(getSuggestionsForUrl(window.location.href));
        }
    }, [open, window.location.href]);

  const getAllExceptLast = (data) => {
    const res = [];
    for (let index = 0; index < data.length - 1; index++) {
      const element = data[index];
      res.push(element);
    }
    return res;
  };

  const formatReplyToHTML = (text) => {
    // Escape HTML characters first to prevent injection
    const escapeHTML = (str) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    let escaped = escapeHTML(text);

    // Convert markdown to HTML tags
    escaped = escaped
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
      .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code
      .replace(/\n/g, "<br>"); // Line breaks

    return escaped;
  };

  const handleSend = async (e, text) => {
    if (e) e.preventDefault();
    const messageText = text !== undefined ? text : input.trim();
    if (!messageText) return;
    console.log(messageText);
    setSuggestions([]); // Hide suggestions after sending a message
    setInput("");
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: messageText },
      { from: "bot", text: "Loading..." },
    ]);
    const response = await chat(messageText);
    console.log(response);
    if (!response.error) {
      setMessages((msgs) => [
        ...getAllExceptLast(msgs),
        { from: "bot", text: response.data.reply },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-16 h-16 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white text-3xl hover:bg-blue-700 transition"
          aria-label="Open chatbot"
        >
          <img src={Icons.ai_bot} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="w-80 bg-white shadow-lg rounded-lg flex flex-col h-96 border border-gray-200">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-semibold flex justify-between items-center">
            <span>Chatbot</span>
            <button
              onClick={() => setOpen(false)}
              className="ml-2 text-white hover:text-gray-200 text-xl font-bold focus:outline-none"
              aria-label="Close chatbot"
              type="button"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.from === "bot" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatReplyToHTML(msg.text),
                      }}
                    />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="flex items-center border-t border-gray-200 px-2 py-2 bg-white"
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
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
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(null, s)}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs hover:bg-blue-100 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
