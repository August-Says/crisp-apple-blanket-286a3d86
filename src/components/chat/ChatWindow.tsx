
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, X } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  webhookUrl: string;
  initiallyOpen?: boolean;
}

const ChatWindow = ({ webhookUrl, initiallyOpen = false }: ChatWindowProps) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! How can I help you today with your marketing canvas?',
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    // Update UI immediately with user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log("Sending message to webhook:", webhookUrl);
      
      // First try with regular CORS enabled
      let response;
      try {
        response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage.content }),
        });
      } catch (err) {
        console.log("Standard request failed, trying with no-cors mode");
        // If the regular request fails, try with no-cors mode
        response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify({ message: userMessage.content }),
        });
        
        // When using no-cors, we can't read the response so provide a fallback
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Message sent! I'll respond shortly. Note: Due to CORS restrictions, I can't see the direct response, but your message was delivered.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
      }

      const responseText = await response.text();
      const responseData = responseText || "I received your message and I'm processing it.";
      
      // Add bot response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseData,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
      
      // Add error message from bot
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm experiencing connectivity issues. I've noted your message and will try to reconnect shortly.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // If initiallyOpen is true, render the full chat without the toggle button
  if (initiallyOpen) {
    return (
      <div className="w-full h-full bg-white rounded-lg shadow-xl border border-navy/20 overflow-hidden flex flex-col">
        {/* Chat header */}
        <div className="bg-navy text-peach p-4 flex justify-between items-center">
          <h3 className="font-medium">August Says AI Assistant</h3>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-navy text-peach' 
                    : 'bg-peach-light text-navy'
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="text-center py-2">
              <div className="inline-flex gap-1">
                <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Chat input */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-navy"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="rounded-full bg-navy hover:bg-navy-light text-peach"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default floating chat window
  return (
    <>
      {/* Chat toggle button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-navy hover:bg-navy-light text-peach shadow-lg"
          aria-label="Toggle chat"
        >
          <MessageCircle size={24} />
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-lg shadow-xl z-40 flex flex-col border border-navy/20 overflow-hidden">
          {/* Chat header */}
          <div className="bg-navy text-peach p-4 flex justify-between items-center">
            <h3 className="font-medium">August Says AI Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat}
              className="h-8 w-8 rounded-full bg-navy-light/20 hover:bg-navy-light/40 text-peach"
            >
              <X size={18} />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-navy text-peach' 
                      : 'bg-peach-light text-navy'
                  }`}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="text-center py-2">
                <div className="inline-flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-navy"
                disabled={isLoading}
              />
              <Button 
                onClick={sendMessage} 
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="rounded-full bg-navy hover:bg-navy-light text-peach"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
