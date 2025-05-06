
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const RecommendedActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-navy/80">
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
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
