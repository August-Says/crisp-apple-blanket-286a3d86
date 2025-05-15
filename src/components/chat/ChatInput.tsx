
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  return (
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
  );
};
