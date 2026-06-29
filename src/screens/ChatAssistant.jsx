import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { SYSTEM_PROMPT } from '../data';

export default function ChatAssistant() {
  const { callOpenAI, apiKey } = useAppContext();
  
  // Store full conversation history for API
  const [history, setHistory] = useState([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'assistant', content: 'Hi Raj! I am HealthBuddy. How can I help you understand your metrics today?' }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !apiKey) return;

    const userMessage = input.trim();
    setInput('');
    
    const newHistory = [...history, { role: 'user', content: userMessage }];
    setHistory(newHistory);
    setIsLoading(true);

    try {
      const response = await callOpenAI(null, newHistory);
      setHistory([...newHistory, { role: 'assistant', content: response }]);
    } catch (error) {
      setHistory([...newHistory, { 
        role: 'assistant', 
        content: `Error: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter out system prompt for UI
  const visibleMessages = history.filter(m => m.role !== 'system');

  return (
    <div className="flex flex-col h-full bg-gray-50 absolute inset-0">
      
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-100 p-3 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-gray-900 text-sm">HealthBuddy Assistant</h2>
          <p className="text-gray-500 text-xs">Always here for your health queries</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {visibleMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-gray-200' : 'bg-brand-blue text-white'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-brand-blue text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-gray-100 rounded-tl-none flex items-center gap-2 text-gray-500 text-xs font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                HealthBuddy is typing...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-gray-100 shrink-0 pb-20">
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={apiKey ? "Ask a health question..." : "Enter API key to chat..."}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-sm transition-all"
            disabled={isLoading || !apiKey}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || !apiKey}
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-brand-blue text-white w-9 rounded-full flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-brand-blue transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
      
    </div>
  );
}
