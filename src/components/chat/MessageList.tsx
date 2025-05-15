
import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { LoadingIndicator } from './LoadingIndicator';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          id={msg.id}
          role={msg.role}
          content={msg.content}
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={messagesEndRef} />
      
      {isLoading && <LoadingIndicator />}
    </div>
  );
};
