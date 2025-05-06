
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

export const useWebhookSubmission = (options?: WebhookOptions): WebhookSubmissionResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [lastRawResponse, setLastRawResponse] = useState<string>('');
  
  const {
    addToHistory,
    navigateHistory,
    hasHistory,
    canGoBack,
    canGoForward,
    currentHistoryEntry
  } = useSubmissionHistory();

  // Using the production webhook URL by default
  const defaultWebhookUrl = 'https://sonarai.app.n8n.cloud/webhook/ff546d84-5999-4dcc-88ee-8ba645810225';
  const webhookUrl = options?.webhookUrl || defaultWebhookUrl;
  const fallbackGenerator = options?.fallbackGenerator || defaultFallbackGenerator;

  const callWebhook = async (
    params: Record<string, string>,
    contentKey?: string,
    contentValue?: string
  ) => {
    setIsLoading(true);
    setLastRawResponse('');
    
    try {
      const response = await executeWebhookRequest({
        params,
        contentKey,
        contentValue,
        webhookUrl,
        useNoCors: true // Add this option to use no-cors mode
      });
      
      setLastRawResponse(response.rawResponse);
      
      if (response.data) {
        const formattedResult = formatWebhookResponse(response.data);
        
        addToHistory({
          result: formattedResult,
          params,
          contentValue
        });
        
        setResult(formattedResult);
        handleSuccessfulResponse('Canvas generated successfully!');
        return response.data;
      } else {
        const fallbackContent = handleEmptyWebhookResponse(fallbackGenerator, contentValue || '');
        setResult(fallbackContent);
        return fallbackContent;
      }
    } catch (error) {
      const fallbackContent = handleWebhookError(error, fallbackGenerator, contentValue || '');
      setResult(fallbackContent);
      return fallbackContent;
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
    lastRawResponse
  };
};
