
import React from 'react';
import { motion } from 'framer-motion';
import N8nChatWindow from '@/components/chat/N8nChatWindow';

const ChatbotPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-6 max-h-[calc(100vh-160px)]"
    >
      <h1 className="text-2xl font-bold text-navy mb-6">August Says Chatbot</h1>
      
      <div className="h-[calc(100vh-230px)] w-full border rounded-lg overflow-hidden bg-white shadow-md">
        <N8nChatWindow 
          webhookUrl="https://sonarai.app.n8n.cloud/webhook/898cef2e-e667-4160-b53d-34177e97e493/chat" 
          initiallyOpen={true}
          className="h-full w-full"
        />
      </div>
    </motion.div>
  );
};

export default ChatbotPage;
