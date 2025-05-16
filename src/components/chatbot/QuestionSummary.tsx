
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuestionSummaryProps {
  questions: string[];
}

const QuestionSummary = ({ questions = [] }: QuestionSummaryProps) => {
  return (
    <Card className="h-full border border-navy/20 overflow-hidden">
      <CardHeader className="bg-navy/10 py-3 px-4">
        <CardTitle className="text-navy text-lg">Question Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-56px)] p-4">
          <ul className="space-y-2">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <li key={index} className="bg-white/60 p-3 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-navy/80 text-sm">{question}</p>
                </li>
              ))
            ) : (
              <li className="p-3 text-navy/60 text-sm italic">
                Questions asked during your conversation will appear here.
              </li>
            )}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QuestionSummary;
