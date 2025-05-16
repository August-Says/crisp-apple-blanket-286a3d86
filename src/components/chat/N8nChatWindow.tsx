
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
    
    // Initialize N8n Chat with only supported configuration options
    const chatInstance = createChat({
      webhookUrl: webhookUrl,
      target: containerElement,
      theme: {
        primaryColor: '#18222f', // Navy color
      },
      // Display the chat directly in the container
      showPopoutButton: false,  // Disable popup button if supported
      fullscreen: true          // Try to use the full container
    });
    
    // Clean up on unmount
    return () => {
      if (typeof chatInstance.unmount === 'function') {
        chatInstance.unmount();
      }
    };
  }, [webhookUrl, initiallyOpen]);

  return (
    <div 
      ref={chatContainerRef} 
      className={`w-full h-full flex flex-col ${className}`}
      data-testid="n8n-chat-container"
      style={{ minHeight: "500px" }}
    />
  );
};

export default N8nChatWindow;
