
import { useEffect, useRef } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

interface N8nChatWindowProps {
  webhookUrl: string;
  initiallyOpen?: boolean;
  className?: string;
}

const N8nChatWindow = ({ webhookUrl, initiallyOpen = false, className = '' }: N8nChatWindowProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatContainerRef.current || !webhookUrl) return;

    const containerElement = chatContainerRef.current;
    
    // Initialize N8n Chat with only officially supported properties
    // According to the library's types, we don't have direct control over the initial open state
    const chatInstance = createChat({
      webhookUrl: webhookUrl,
      target: containerElement,
      theme: {
        primaryColor: '#18222f', // Navy color
      }
    });
    
    // Note: Since the `open` method doesn't exist on the chat instance according to TypeScript,
    // we can't programmatically control the initial state.
    // The library likely handles this through its own internal mechanism.
    
    // Clean up on unmount
    return () => {
      // Check if chatInstance has an unmount or cleanup method
      if (typeof chatInstance.unmount === 'function') {
        chatInstance.unmount();
      }
    };
  }, [webhookUrl, initiallyOpen]);

  return (
    <div 
      ref={chatContainerRef} 
      className={`w-full h-full ${className}`}
      data-testid="n8n-chat-container"
    />
  );
};

export default N8nChatWindow;
