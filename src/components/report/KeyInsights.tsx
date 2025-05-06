
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface KeyInsightsProps {
  industry: string;
  painPoints: string;
}

const KeyInsights = ({ industry, painPoints }: KeyInsightsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-navy/80">
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
      </CardContent>
    </Card>
  );
};

export default KeyInsights;
