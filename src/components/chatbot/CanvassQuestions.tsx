
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CanvassQuestion {
  id: string;
  question: string;
  category: string;
}

interface CanvassQuestionsProps {
  questions: CanvassQuestion[];
  onAddToCanvass?: (questionId: string) => void;
}

const CanvassQuestions = ({ questions = [], onAddToCanvass }: CanvassQuestionsProps) => {
  return (
    <Card className="h-full border border-navy/20 overflow-hidden">
      <CardHeader className="bg-navy/10 py-3 px-4">
        <CardTitle className="text-navy text-lg">Potential Canvass Questions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-56px)] p-4">
          <div className="space-y-3">
            {questions.length > 0 ? (
              questions.map((item) => (
                <div key={item.id} className="bg-white/60 p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-navy/80 text-sm mb-1">{item.question}</p>
                      <span className="text-xs text-navy/60 bg-navy/5 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 w-8 p-0"
                      onClick={() => onAddToCanvass && onAddToCanvass(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-navy/60 text-sm italic p-3">
                Potential questions for your empathy canvass will appear here based on your conversation.
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CanvassQuestions;
