
import { Section } from '@/utils/contentProcessing/types';

interface MiniInsightSummaryProps {
  companyName: string;
  industry: string;
  painPoints: string;
  processedSections: Section[];
  webhookData?: any;
}

const MiniInsightSummary = ({ 
  companyName, 
  industry, 
  painPoints,
  processedSections,
  webhookData 
}: MiniInsightSummaryProps) => {
  
  // Find the executive summary and key insights sections if available
  const executiveSummary = processedSections.find(section => 
    section.title.toLowerCase().includes('executive summary') || 
    section.title.toLowerCase().includes('summary') || 
    section.title.toLowerCase().includes('overview')
  );
  
  const keyInsights = processedSections.find(section => 
    section.title.toLowerCase().includes('key insights') || 
    section.title.toLowerCase().includes('insights') || 
    section.title.toLowerCase().includes('findings')
  );

  // Extract data directly from webhook response if available
  const customerThemes = webhookData && 
    Array.isArray(webhookData) && 
    webhookData[0]?.output?.customer_themes;

  const emotionalStatements = webhookData && 
    Array.isArray(webhookData) && 
    webhookData[0]?.output?.emotional_statements;
  
  return (
    <div className="space-y-6">
      {/* Executive Summary Section */}
      <div>
        <h2 className="text-xl font-semibold text-navy border-b border-navy/20 pb-2 mb-3">
          Quick Summary
        </h2>
        
        {customerThemes ? (
          <div className="prose prose-sm text-navy/80 max-w-none">
            <p className="text-navy/80">{String(Object.values(customerThemes)[0] || '')}</p>
          </div>
        ) : executiveSummary ? (
          <div className="prose prose-sm text-navy/80 max-w-none">
            <p className="text-navy/80">{executiveSummary.content.split('\n')[0]}</p>
          </div>
        ) : (
          <p className="text-navy/80">
            Based on our analysis, {companyName} in the {industry} industry 
            could benefit from addressing challenges related to {painPoints || 'customer engagement'}. 
            Our preliminary data suggests opportunities for growth through targeted improvements.
          </p>
        )}
      </div>
      
      {/* Key Insights Section - Show only top 3 */}
      <div>
        <h2 className="text-xl font-semibold text-navy border-b border-navy/20 pb-2 mb-3">
          Top Insights
        </h2>
        
        {emotionalStatements && Array.isArray(emotionalStatements) ? (
          <div className="space-y-3 text-navy/80">
            {emotionalStatements.slice(0, 3).map((statement, index) => (
              <div key={index} className="flex gap-3">
                <div className="bg-peach/30 text-navy font-semibold h-7 w-7 flex items-center justify-center rounded-full shrink-0">
                  {index + 1}
                </div>
                <p>{String(statement)}</p>
              </div>
            ))}
          </div>
        ) : keyInsights ? (
          <div className="space-y-3 text-navy/80">
            {keyInsights.content.split('\n')
              .filter(line => line.trim().length > 0)
              .slice(0, 3)
              .map((insight, index) => (
                <div key={index} className="flex gap-3">
                  <div className="bg-peach/30 text-navy font-semibold h-7 w-7 flex items-center justify-center rounded-full shrink-0">
                    {index + 1}
                  </div>
                  <p>{insight.replace(/^\d+\.\s*/, '').replace(/^[•*]\s*/, '')}</p>
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="bg-peach/30 text-navy font-semibold h-7 w-7 flex items-center justify-center rounded-full shrink-0">1</div>
              <p className="text-navy/80">Implementing a direct customer feedback system could improve engagement metrics.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-peach/30 text-navy font-semibold h-7 w-7 flex items-center justify-center rounded-full shrink-0">2</div>
              <p className="text-navy/80">Your {industry} competitors are focusing on digital transformation initiatives.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-peach/30 text-navy font-semibold h-7 w-7 flex items-center justify-center rounded-full shrink-0">3</div>
              <p className="text-navy/80">Addressing {painPoints || 'customer engagement'} could lead to 15-20% revenue growth.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className="pt-3 text-center">
        <p className="font-medium text-navy">
          Want a deeper analysis? Check out the full report.
        </p>
      </div>
    </div>
  );
};

export default MiniInsightSummary;
