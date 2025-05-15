
import { useEffect, useRef } from 'react';
import { Chat } from '@n8n/chat';
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

    // Initialize N8n Chat
    const chatInstance = new Chat({
      webhookUrl: webhookUrl,
      container: chatContainerRef.current,
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
      chatInstance.destroy();
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
