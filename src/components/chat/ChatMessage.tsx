
import { MessageCircle, Send, X } from 'lucide-react';

interface MessageProps {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatMessage = ({ id, role, content, timestamp }: MessageProps) => {
  return (
    <div className={`mb-4 ${role === 'user' ? 'text-right' : 'text-left'}`}>
      <div 
        className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
          role === 'user' 
            ? 'bg-navy text-peach' 
            : 'bg-peach-light text-navy'
        }`}
      >
        {content}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};
