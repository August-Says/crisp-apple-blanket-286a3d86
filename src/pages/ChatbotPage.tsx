
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import N8nChatWindow from '@/components/chat/N8nChatWindow';
import QuestionSummary from '@/components/chatbot/QuestionSummary';
import CanvassQuestions from '@/components/chatbot/CanvassQuestions';

const ChatbotPage = () => {
  // Sample data for demonstration
  const [askedQuestions, setAskedQuestions] = useState<string[]>([
    "What are the main pain points for our target audience?",
    "How does our product address customer needs?",
    "What emotional triggers drive purchase decisions?"
  ]);
  
  const [potentialCanvassQuestions, setPotentialCanvassQuestions] = useState([
    {
      id: "1",
      question: "How do you feel when you can't find the information you need quickly?",
      category: "Pain Point"
    },
    {
      id: "2",
      question: "What emotions arise when using our product for the first time?",
      category: "User Experience"
    },
    {
      id: "3",
      question: "Which features make you feel most confident in our solution?",
      category: "Value Proposition"
    }
  ]);
  
  const handleAddToCanvass = (questionId: string) => {
    console.log(`Adding question ${questionId} to canvass`);
    // Implementation for adding to canvas would go here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-6 h-[calc(100vh-64px)]"
    >
      <h1 className="text-2xl font-bold text-navy mb-6">August Says Chatbot</h1>
      
      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-[500px] h-[calc(100%-60px)] rounded-lg border"
      >
        {/* Main Chat Window - 60% */}
        <ResizablePanel defaultSize={60} minSize={40}>
          <div className="h-full p-1 chat-container">
            <N8nChatWindow webhookUrl="https://sonarai.app.n8n.cloud/webhook/898cef2e-e667-4160-b53d-34177e97e493/chat" initiallyOpen={true} />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right side panels */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* Question Summary - Top Right */}
            <ResizablePanel defaultSize={50}>
              <div className="h-full p-1">
                <QuestionSummary questions={askedQuestions} />
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Canvass Questions - Bottom Right */}
            <ResizablePanel defaultSize={50}>
              <div className="h-full p-1">
                <CanvassQuestions 
                  questions={potentialCanvassQuestions} 
                  onAddToCanvass={handleAddToCanvass}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

      <style jsx>{`
        /* Custom CSS to force n8n chat to be always visible */
        :global(.chat-container .n8n-chat__widget) {
          position: relative;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          max-height: none;
          max-width: none;
          border-radius: 8px;
          box-shadow: none;
        }
        
        :global(.chat-container .n8n-chat__window) {
          position: relative;
          height: 100%;
          width: 100%;
          max-height: none;
          max-width: none;
          display: flex;
          flex-direction: column;
        }
        
        :global(.chat-container .n8n-chat__button) {
          display: none;
        }
      `}</style>
    </motion.div>
  );
};

export default ChatbotPage;
