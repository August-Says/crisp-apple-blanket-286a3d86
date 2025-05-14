
import { Section } from '../types';
import { OutputStructure } from './types';
import { logger } from '../logger';

/**
 * Process the second output object (outcome with insights and implications)
 */
export const processSecondOutput = (output: string | OutputStructure): Section[] => {
  const sections: Section[] = [];
  logger.info("Processing second output object:", typeof output);
  
  // Handle string output (markdown)
  if (typeof output === 'string') {
    try {
      const parsedOutput = JSON.parse(output);
      logger.info("Successfully parsed string output as JSON");
      
      // Process structured object
      if (parsedOutput.outcome) {
        return processOutcomeObject(parsedOutput.outcome);
      } else if (parsedOutput.insights || parsedOutput.strategic_implications) {
        // Direct insights and implications at root level
        return processDirectInsights(parsedOutput);
      }
    } catch (e) {
      sections.push({
        title: "Outcome",
        content: output
      });
      logger.info("Added outcome section from string output");
    }
  } else if (output && typeof output === 'object') {
    // Process structured outcome object
    if (output.outcome) {
      return processOutcomeObject(output.outcome);
    } else if (output.insights || output.strategic_implications) {
      // Direct insights and implications at root level
      return processDirectInsights(output);
    } else {
      logger.info("No insights or strategic implications found in second output");
    }
  }
  
  return sections;
};

/**
 * Process the outcome object with insights and strategic implications
 */
const processOutcomeObject = (outcome: any): Section[] => {
  const sections: Section[] = [];
  
  // Process insights
  if (outcome.insights && Array.isArray(outcome.insights)) {
    logger.info(`Processing ${outcome.insights.length} insights`);
    
    const insights = outcome.insights.map(
      (insight: any, i: number) => `${i+1}. <strong>${insight.category}</strong>: ${insight.description}`
    ).join('\n\n');
    
    sections.push({
      title: "Key Insights",
      content: insights
    });
    logger.info("Added insights section as numbered list");
  } else {
    logger.info("No insights array found in outcome");
  }
  
  // Process strategic implications without bolding
  if (outcome.strategic_implications && Array.isArray(outcome.strategic_implications)) {
    logger.info(`Processing ${outcome.strategic_implications.length} strategic implications`);
    
    const implications = outcome.strategic_implications.map((imp: string, i: number) => {
      // No bold formatting, just numbered list
      return `${i+1}. ${imp}`;
    }).join('\n\n');
    
    sections.push({
      title: "Strategic Implications",
      content: implications
    });
    logger.info("Added strategic implications section without bolding");
  } else {
    logger.info("No strategic_implications array found in outcome");
  }
  
  return sections;
};

/**
 * Process direct insights and strategic implications at root level
 */
const processDirectInsights = (data: any): Section[] => {
  const sections: Section[] = [];
  
  // Process insights
  if (data.insights && Array.isArray(data.insights)) {
    logger.info(`Processing ${data.insights.length} direct insights`);
    
    const insights = data.insights.map(
      (insight: any, i: number) => `${i+1}. <strong>${insight.category}</strong>: ${insight.description}`
    ).join('\n\n');
    
    sections.push({
      title: "Key Insights",
      content: insights
    });
    logger.info("Added direct insights section");
  }
  
  // Process strategic implications
  if (data.strategic_implications && Array.isArray(data.strategic_implications)) {
    logger.info(`Processing ${data.strategic_implications.length} direct strategic implications`);
    
    const implications = data.strategic_implications.map((imp: any, i: number) => {
      // Handle both string and object formats
      const implicationText = typeof imp === 'string' ? imp : imp.implication || JSON.stringify(imp);
      return `${i+1}. ${implicationText}`;
    }).join('\n\n');
    
    sections.push({
      title: "Strategic Implications",
      content: implications
    });
    logger.info("Added direct strategic implications section");
  }
  
  return sections;
};
