import { Paperclip, ArrowUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function MessageInputBox({ onSend }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message.trim() === "") return;
    if (onSend) onSend(message);
    setMessage("");
  };

  // Auto-focus when component mounts
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center justify-between w-full bg-white shadow-lg px-4 py-3 border border-gray-200 ">
      {/* Editable textarea */}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your startup, who it’s for, and your goal..."
        rows={2}
        className="flex-1 resize-none outline-none border-none text-sm text-gray-800 placeholder-gray-400 px-3 py-2  bg-gray-50 shadow-inner focus:ring-2 focus:ring-orange-400 transition-all duration-200"
      />

      {/* Icons section */}
      <div className="flex items-center gap-3 ml-3">
        <Paperclip className="w-5 h-5 text-white cursor-pointer hover:text-gray-700 transition" />
        <button
          onClick={handleSend}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary"
        >
          <ArrowUp
            className={`w-5 h-5 text-white ${message.trim() ? "opacity-100" : "opacity-50"}`}
          />
        </button>
      </div>
    </div>
  );
}
