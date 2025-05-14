
/**
 * Format the second output (outcome with insights and implications)
 */
export const formatSecondOutput = (data: any): string => {
  if (!data) return '';
  
  let formattedContent = '';

  // Process content when wrapped in outcome object
  if (data.outcome) {
    // Format insights as numbered list (like strategic implications)
    if (data.outcome.insights && Array.isArray(data.outcome.insights)) {
      formattedContent += `## Key Insights\n\n`;
      
      data.outcome.insights.forEach((insight: any, i: number) => {
        // Properly format with HTML-like markup to be parsed later by the markdown renderer
        formattedContent += `${i+1}. <strong>${insight.category}</strong>: ${insight.description}\n\n`;
      });
    }
    
    // Format strategic implications - without bolding the whole text
    if (data.outcome.strategic_implications && Array.isArray(data.outcome.strategic_implications)) {
      formattedContent += `## Strategic Implications\n\n`;
      
      data.outcome.strategic_implications.forEach((implication: string, i: number) => {
        // Just use the implication text without any bold formatting
        formattedContent += `${i+1}. ${implication}\n\n`;
      });
    }
  } 
  // Process content when insights and implications are at the root level
  else {
    // Format insights
    if (data.insights && Array.isArray(data.insights)) {
      formattedContent += `## Key Insights\n\n`;
      
      data.insights.forEach((insight: any, i: number) => {
        // Properly format with HTML-like markup to be parsed later by the markdown renderer
        formattedContent += `${i+1}. <strong>${insight.category}</strong>: ${insight.description}\n\n`;
      });
    }
    
    // Format strategic implications
    if (data.strategic_implications && Array.isArray(data.strategic_implications)) {
      formattedContent += `## Strategic Implications\n\n`;
      
      data.strategic_implications.forEach((implication: any, i: number) => {
        const impText = typeof implication === 'string' ? implication : (implication.implication || JSON.stringify(implication));
        formattedContent += `${i+1}. ${impText}\n\n`;
      });
    }
  }
  
  return formattedContent.trim();
};
