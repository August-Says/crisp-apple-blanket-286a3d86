
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChatState } from './useChatState';

interface ChatWindowProps {
  webhookUrl: string;
  initiallyOpen?: boolean;
}

const ChatWindow = ({ webhookUrl, initiallyOpen = false }: ChatWindowProps) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const { messages, isLoading, sendMessage } = useChatState(webhookUrl);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
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
        <MessageList messages={messages} isLoading={isLoading} />
        
        {/* Chat input */}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
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
          <MessageList messages={messages} isLoading={isLoading} />
          
          {/* Chat input */}
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default ChatWindow;
