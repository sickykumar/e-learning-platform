import { useState, useEffect, useRef } from "react";
import { askChatbot } from "../../api/authApi";
import { MessageCircle, Send, X, BookOpen, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";

const getCategoryColor = (category) => {
  switch (category) {
    case 'Frontend':
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    case 'Backend':
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'Database':
      return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    case 'Full Stack':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'Design':
      return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
    case 'Business':
      return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
    case 'Marketing':
      return 'bg-teal-500/10 text-teal-400 border border-teal-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
  }
};

const ChatBoat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! I'm your AI Learning Assistant. Ask me anything about our courses or tracks!",
      courses: []
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, courses: [] },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await askChatbot(userMsg);

      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: data.reply, 
          courses: data.courses || [] 
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong 😔");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I encountered an issue connecting to the AI helper. Please try again.",
          courses: []
        },
      ]);
    }

    setLoading(false);
  };

  const formatMessageText = (text) => {
    if (!text) return "";
    return text.split("\n").map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={partIdx} className="font-extrabold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
      return (
        <div key={lineIdx} className={lineIdx > 0 ? "mt-1.5" : ""}>
          {renderedLine}
        </div>
      );
    });
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-24 left-6 w-[360px] h-[520px] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl z-[9999] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Academy Advisor</h3>
                  <p className="text-[10px] text-indigo-200">Online & Ready to Help</p>
                </div>
              </div>

              <button 
                onClick={() => setOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-800">
              {messages.map((msg, index) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                        isUser
                          ? "bg-indigo-600 text-white rounded-tr-none ml-auto"
                          : "bg-slate-800/90 text-gray-200 border border-slate-700/50 rounded-tl-none mr-auto"
                      }`}
                    >
                      {formatMessageText(msg.text)}

                      {/* Course Recommendations Stack */}
                      {!isUser && msg.courses && msg.courses.length > 0 && (
                        <div className="mt-3.5 space-y-3 w-full">
                          {msg.courses.map((course) => (
                            <div
                              key={course._id}
                              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 shadow-lg group"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold border ${getCategoryColor(course.category)}`}>
                                  {course.category || 'General'}
                                </span>
                                <span className="text-[9px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-900/40 font-bold">
                                  {course.level}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                                {course.title}
                              </h4>

                              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80">
                                <div className="flex flex-col">
                                  <span className="text-[7.5px] text-slate-500 uppercase tracking-wider font-semibold">Price</span>
                                  <span className="text-[11px] font-extrabold text-emerald-400">₹{course.price}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-[7.5px] text-slate-500 uppercase tracking-wider font-semibold">Duration</span>
                                  <span className="text-[10px] text-slate-300 font-bold flex items-center gap-1">
                                    <Clock size={10} className="text-indigo-400" />
                                    {course.duration || 'N/A'}
                                  </span>
                                </div>
                              </div>

                              <Link
                                to={`/courses/${course._id}`}
                                onClick={() => setOpen(false)}
                                className="w-full mt-3 py-1.5 flex items-center justify-center gap-1 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-[10px] font-extrabold transition-all duration-300 border border-indigo-500/30 hover:border-transparent cursor-pointer shadow-sm"
                              >
                                <BookOpen size={11} />
                                View Details
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-1.5 bg-slate-800 text-gray-400 px-4 py-3 rounded-2xl rounded-tl-none w-fit text-sm shadow-sm border border-slate-700/50">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3.5 border-t border-slate-800 bg-slate-900/98 flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSend()
                }
                placeholder="Ask about webdev, backend, price..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950 text-white placeholder-slate-500 text-xs border border-slate-800 focus:border-indigo-500/60 focus:outline-none transition-colors"
              />

              <button
                onClick={handleSend}
                disabled={loading || !message.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-4 rounded-xl text-white transition-colors flex items-center justify-center"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[9999]"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{
            background: [
              "#4f46e5",
              "#7c3aed",
              "#db2777",
              "#0891b2",
              "#4f46e5",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-14 h-14 rounded-full p-[2.5px] shadow-lg shadow-indigo-600/30"
        >
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
            {open ? (
              <X size={24} className="text-white" />
            ) : (
              <MessageCircle
                size={26}
                className="text-white animate-pulse"
              />
            )}
          </div>
        </motion.div>
      </motion.button>
    </>
  );
};

export default ChatBoat;
