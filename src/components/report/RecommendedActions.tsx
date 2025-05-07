
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface RecommendedActionsProps {
  webhookData?: any;
}

const RecommendedActions = ({ webhookData }: RecommendedActionsProps) => {
  const [empathyQuestions, setEmpathyQuestions] = useState<any[] | null>(null);
  
  useEffect(() => {
    if (webhookData) {
      try {
        // Check if webhookData is an array (common format from n8n)
        if (Array.isArray(webhookData) && webhookData.length > 0) {
          // Try to extract empathy canvas from the first output
          const firstOutput = webhookData[0]?.output;
          
          if (firstOutput?.empathy_canvass && Array.isArray(firstOutput.empathy_canvass)) {
            setEmpathyQuestions(firstOutput.empathy_canvass);
          }
        }
      } catch (error) {
        console.error('Error extracting recommended actions from webhook data:', error);
      }
    }
  }, [webhookData]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-navy/80">
        {empathyQuestions ? (
          // Display empathy questions from webhook data
          empathyQuestions.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-peach/30 text-navy font-semibold h-8 w-8 flex items-center justify-center rounded-full">{index + 1}</div>
              <div>
                <h3 className="font-semibold text-navy">{item.question}</h3>
                <ul className="mt-2 space-y-1">
                  {item.options.map((option, optIndex) => (
                    <li key={optIndex} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-navy/60"></span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          // Fallback content if no webhook data is available
          <>
            <div className="flex items-start gap-4">
              <div className="bg-peach/30 text-navy font-semibold h-8 w-8 flex items-center justify-center rounded-full">1</div>
              <div>
                <h3 className="font-semibold text-navy">Implement Interactive Feedback Channels</h3>
                <p>Launch a gamified survey system to increase customer engagement metrics by 30% in Q3.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-peach/30 text-navy font-semibold h-8 w-8 flex items-center justify-center rounded-full">2</div>
              <div>
                <h3 className="font-semibold text-navy">Enhance Customer Service Protocol</h3>
                <p>Reduce response times from current 24 hours to under 6 hours to match industry leaders.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-peach/30 text-navy font-semibold h-8 w-8 flex items-center justify-center rounded-full">3</div>
              <div>
                <h3 className="font-semibold text-navy">Targeted Messaging Strategy</h3>
                <p>Refocus marketing materials to address the specific concerns identified in your neutral customer segment.</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
