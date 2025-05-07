
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { GameImage } from '@/components/result/GameImageDisplay';
import { useState, useEffect } from 'react';

interface CanvassGameSampleProps {
  companyName?: string;
  webhookData?: any;
}

const CanvassGameSample = ({ companyName, webhookData }: CanvassGameSampleProps) => {
  const [company, setCompany] = useState<string>('');
  
  useEffect(() => {
    // Try to extract company name from webhook data if it exists
    if (webhookData) {
      try {
        if (Array.isArray(webhookData) && webhookData[0]?.output?.company) {
          setCompany(webhookData[0].output.company);
        }
      } catch (error) {
        console.error('Error extracting company from webhook data:', error);
      }
    }
    
    // Use the prop as fallback
    if (!company && companyName) {
      setCompany(companyName);
    }
  }, [webhookData, companyName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Canvass Game Sample</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-navy/80">
          Below is an interactive visualization example based on your canvas content.
          This game helps teams better understand customer sentiments and pain points.
        </p>
        
        <div className="mt-4 border border-navy/10 rounded-lg overflow-hidden">
          <GameImage 
            imagePath="generic_this-or-that_game.gif"
            altText={`${company || 'Interactive'} This-or-That Game Sample`}
            isLocalImage={false}
          />
        </div>
        
        <p className="text-sm text-navy/60 italic">
          This is a sample visualization. The premium version includes customized games 
          tailored to your company's specific data and insights.
        </p>
      </CardContent>
    </Card>
  );
};

export default CanvassGameSample;
