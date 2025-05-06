
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface ExecutiveSummaryProps {
  companyName: string;
  industry: string;
  painPoints: string;
}

const ExecutiveSummary = ({ companyName, industry, painPoints }: ExecutiveSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
      </CardHeader>
      <CardContent className="text-navy/80">
        <p>
          Based on our analysis, {companyName} in the {industry} industry 
          is facing challenges primarily related to {painPoints || 'customer engagement'}. 
          Our data suggests that implementing a more interactive customer feedback system could 
          increase engagement by 27% within 3 months.
        </p>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
