
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
    
    // Initialize N8n Chat - using proper API
    const chatInstance = createChat({
      webhookUrl: webhookUrl,
      target: containerElement, // Use 'target' instead of 'container'
      showTitle: true,
      title: 'August Says AI Assistant',
      titleColor: '#18222f', // Navy color
      primaryColor: '#18222f', // Navy color
      initiallyOpen: initiallyOpen,
      containerWidth: '100%',
      containerHeight: '100%',
      avatar: {
        imageUrl: null, // You can add a logo URL here if desired
      },
    });
    
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
