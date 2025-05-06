/**
 * Default fallback content generator used when webhook fails or returns no valid data
 */
export const defaultFallbackGenerator = (content: string) => {
  // Try to extract company and industry from the content if it's in JSON format
  let companyName = 'Your Company';
  let industry = 'Your Industry';
  let painPoints = 'customer engagement';
  
  try {
    // Try to parse if it's JSON
    if (content.includes('companyName') || content.includes('industry')) {
      // First try to parse as an object
      if (content.startsWith('{')) {
        const parsed = JSON.parse(content);
        companyName = parsed.companyName || companyName;
        industry = parsed.industry || industry;
        painPoints = parsed.painPoints || painPoints;
      } else {
        // Otherwise extract from string
        const companyMatch = content.match(/Company: ([^\n]+)/);
        const industryMatch = content.match(/Industry: ([^\n]+)/);
        const painPointsMatch = content.match(/Pain Points: ([^\n]+)/);
        
        if (companyMatch) companyName = companyMatch[1];
        if (industryMatch) industry = industryMatch[1];
        if (painPointsMatch) painPoints = painPointsMatch[1];
      }
    }
  } catch (e) {
    console.error('Error parsing content in fallback generator:', e);
    // Just use the defaults if parsing fails
  }

  return `# Marketing Canvas for ${companyName}

## Executive Summary
${companyName} in the ${industry} industry is facing challenges related to ${painPoints}. This report provides actionable insights to address these challenges and improve business outcomes.

## Key Insights
1. <strong>Customer Behavior</strong>: Understanding the customer journey is critical for improving retention rates.

2. <strong>Market Trends</strong>: The ${industry} industry is experiencing rapid digital transformation requiring companies to adapt quickly.

3. <strong>Competitive Analysis</strong>: Benchmarking against industry leaders reveals opportunities for differentiation.

## Strategic Implications
1. Implementing a comprehensive customer feedback system could increase engagement metrics by 25-30%.

2. Personalized communication strategies based on customer segmentation data will likely improve retention.

3. Investing in digital transformation initiatives will be essential to remain competitive in the ${industry} market.

## Activation Add-ons
1. <strong>Customer Journey Mapping</strong>

Execution Plan: Conduct workshops with key stakeholders to document the current customer journey and identify pain points.

Copy Example: "Understand every step of your customer's experience to create meaningful connections that last."

2. <strong>Retention Campaign Framework</strong>

Execution Plan: Develop targeted communication strategies for different customer segments based on engagement history.

Copy Example: "Keep your valuable customers coming back with personalized experiences that show you understand their needs."`;
};
