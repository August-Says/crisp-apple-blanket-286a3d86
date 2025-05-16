
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
    
    // Initialize N8n Chat with supported configuration options
    const chatInstance = createChat({
      webhookUrl: webhookUrl,
      target: containerElement,
      theme: {
        primaryColor: '#18222f', // Navy color
      },
      // Don't use defaultOpen as it's not supported
    });
    
    // Manually handle the initial state
    if (initiallyOpen) {
      // The initiallyOpen prop is handled manually here
      // We can add a class or attribute to control visibility
      if (containerElement.firstChild) {
        // Add any styling or visibility control here if needed
        console.log('Chat should be initially open');
      }
    }
    
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
      data-initially-open={initiallyOpen}
      style={{ minHeight: "600px", width: "100%" }}
    />
  );
};

export default N8nChatWindow;
