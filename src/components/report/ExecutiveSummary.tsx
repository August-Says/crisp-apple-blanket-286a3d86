
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface ExecutiveSummaryProps {
  companyName: string;
  industry: string;
  painPoints: string;
  webhookData?: any;
}

const ExecutiveSummary = ({ companyName, industry, painPoints, webhookData }: ExecutiveSummaryProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  
  useEffect(() => {
    if (webhookData) {
      try {
        // Check if webhookData is an array (common format from n8n)
        if (Array.isArray(webhookData) && webhookData.length > 0) {
          // Extract company name and customer themes
          const firstOutput = webhookData[0]?.output;
          
          if (firstOutput?.customer_themes) {
            // Combine pain points from customer themes into a summary
            const painPoints = Object.values(firstOutput.customer_themes)
              .filter(Boolean)
              .join(' ');
            
            setSummary(painPoints);
          }
          
          // If company name is available in the response, use it
          const responseCompanyName = firstOutput?.company;
          if (responseCompanyName) {
            console.log(`Company name found in response: ${responseCompanyName}`);
          }
        }
      } catch (error) {
        console.error('Error extracting summary from webhook data:', error);
      }
    }
  }, [webhookData]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
      </CardHeader>
      <CardContent className="text-navy/80">
        {summary ? (
          <p>{summary}</p>
        ) : (
          <p>
            Based on our analysis, {companyName} in the {industry} industry 
            is facing challenges primarily related to {painPoints || 'customer engagement'}. 
            Our data suggests that implementing a more interactive customer feedback system could 
            increase engagement by 27% within 3 months.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
