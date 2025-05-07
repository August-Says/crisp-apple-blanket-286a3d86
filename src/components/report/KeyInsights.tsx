
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface KeyInsightsProps {
  industry: string;
  painPoints: string;
  webhookData?: any;
}

const KeyInsights = ({ industry, painPoints, webhookData }: KeyInsightsProps) => {
  const [emotionalStatements, setEmotionalStatements] = useState<string[] | null>(null);
  
  useEffect(() => {
    if (webhookData) {
      try {
        // Check if webhookData is an array (common format from n8n)
        if (Array.isArray(webhookData) && webhookData.length > 0) {
          // Try to extract emotional statements from the first output
          const firstOutput = webhookData[0]?.output;
          
          if (firstOutput?.emotional_statements && Array.isArray(firstOutput.emotional_statements)) {
            setEmotionalStatements(firstOutput.emotional_statements);
          }
        }
      } catch (error) {
        console.error('Error extracting insights from webhook data:', error);
      }
    }
  }, [webhookData]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-navy/80">
        {emotionalStatements ? (
          // Display insights from webhook data
          emotionalStatements.map((statement, index) => (
            <div key={index}>
              <h3 className="font-semibold text-navy">{index + 1}. Customer Sentiment</h3>
              <p>"{statement}"</p>
            </div>
          ))
        ) : (
          // Fallback content if no webhook data is available
          <>
            <div>
              <h3 className="font-semibold text-navy">1. Customer Sentiment Analysis</h3>
              <p>
                73% of your target audience expresses positive sentiment toward your brand, 
                however, there's a notable 18% neutral segment that represents conversion opportunities.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy">2. Competitive Positioning</h3>
              <p>
                Your company ranks 3rd in customer satisfaction among 7 key competitors in the {industry} space, 
                with notable advantages in product quality but opportunities for improvement in customer service response times.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy">3. Market Opportunity</h3>
              <p>
                We've identified a $2.4M annual revenue opportunity by addressing the specific pain points 
                around {painPoints || 'customer engagement'} through implementing gamified feedback systems.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyInsights;
