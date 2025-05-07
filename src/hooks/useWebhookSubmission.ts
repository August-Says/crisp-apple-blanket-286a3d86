
import { useState } from 'react';
import { WebhookOptions, WebhookSubmissionResult } from '@/types/webhook';
import { formatWebhookResponse } from '@/utils/webhookFormatter';
import { defaultFallbackGenerator } from '@/utils/fallbackContentGenerator';
import { useSubmissionHistory } from '@/hooks/useSubmissionHistory';
import { executeWebhookRequest } from '@/utils/webhookRequestHandler';
import { 
  handleWebhookError, 
  handleEmptyWebhookResponse,
  handleSuccessfulResponse
} from '@/utils/errorHandler';
import { toast } from 'sonner';

export const useWebhookSubmission = (options?: WebhookOptions): WebhookSubmissionResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [lastRawResponse, setLastRawResponse] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  const {
    addToHistory,
    navigateHistory,
    hasHistory,
    canGoBack,
    canGoForward,
    currentHistoryEntry
  } = useSubmissionHistory();

  // Update to use the test webhook URL if provided, or default to production URL
  const defaultWebhookUrl = 'https://sonarai.app.n8n.cloud/webhook-test/715d27f7-f730-437c-8abe-cda82e04210e';
  const webhookUrl = options?.webhookUrl || defaultWebhookUrl;
  const fallbackGenerator = options?.fallbackGenerator || defaultFallbackGenerator;

  const callWebhook = async (
    params: Record<string, string>,
    contentKey?: string,
    contentValue?: string
  ) => {
    setIsLoading(true);
    setLastRawResponse('');
    setDebugInfo(null);
    
    try {
      console.log('Calling webhook with params:', params);
      console.log('Using webhook URL:', webhookUrl);
      toast.info("Connecting to webhook...");
      toast.info("This may take up to 90 seconds to process");
      
      // First try with CORS enabled
      const response = await executeWebhookRequest({
        params,
        contentKey,
        contentValue,
        webhookUrl,
        useNoCors: false,
        timeoutSeconds: 90 // Explicitly set timeout to 90 seconds
      }).catch(async error => {
        console.log('Regular request failed, trying with no-cors mode', error);
        toast.info("Standard request failed, trying alternative connection method");
        
        // If the regular request fails, try with no-cors mode
        return executeWebhookRequest({
          params,
          contentKey,
          contentValue,
          webhookUrl,
          useNoCors: true,
          timeoutSeconds: 90 // Explicitly set timeout to 90 seconds
        });
      });
      
      console.log('Webhook response received:', response);
      setDebugInfo(response);
      
      // For debugging, store the raw response 
      if (response.rawResponse) {
        console.log('Full raw response:', response.rawResponse);
        setLastRawResponse(response.rawResponse);
      } else if (response.data) {
        setLastRawResponse(JSON.stringify(response.data));
      }
      
      if (response.data) {
        const formattedResult = formatWebhookResponse(response.data);
        console.log('Formatted webhook result:', formattedResult);
        
        addToHistory({
          result: formattedResult,
          params,
          contentValue
        });
        
        setResult(formattedResult);
        handleSuccessfulResponse('Canvas generated successfully!');
        
        // Return the raw data instead of formatted result
        return response.data;
      } else if (response.success && response.rawResponse === 'No response available in no-cors mode') {
        // Handle successful no-cors requests, which don't return data
        toast.success("Request sent successfully, proceeding with default values");
        
        // Generate a more useful fallback content using the input parameters
        const fallbackContent = fallbackGenerator(`Company: ${params.companyName}\nIndustry: ${params.industry}\nPain Points: ${params.painPoints || 'None provided'}`);
        console.log('Generated fallback content:', fallbackContent);
        
        addToHistory({
          result: fallbackContent,
          params,
          contentValue
        });
        
        setResult(fallbackContent);
        return { success: true, fallbackContent };
      } else {
        const fallbackContent = handleEmptyWebhookResponse(fallbackGenerator, contentValue || JSON.stringify(params));
        setResult(fallbackContent);
        console.log('Using fallback content due to empty response:', fallbackContent);
        return { fallbackContent, debug: response };
      }
    } catch (error) {
      console.error('Error in callWebhook:', error);
      setDebugInfo({ error: error.toString() });
      const fallbackContent = handleWebhookError(error, fallbackGenerator, contentValue || JSON.stringify(params));
      console.log('Using fallback content due to error:', fallbackContent);
      setResult(fallbackContent);
      return { fallbackContent, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    result,
    setResult,
    callWebhook,
    navigateHistory,
    hasHistory,
    canGoBack,
    canGoForward,
    currentHistoryEntry,
    lastRawResponse,
    debugInfo
  };
};
