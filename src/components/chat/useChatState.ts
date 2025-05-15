
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { sendMessageToWebhook } from './chatService';
import { Message } from './MessageList';

export const useChatState = (webhookUrl: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    // Update UI immediately with user message
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseData = await sendMessageToWebhook(webhookUrl, userMessage.content);
      
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

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
