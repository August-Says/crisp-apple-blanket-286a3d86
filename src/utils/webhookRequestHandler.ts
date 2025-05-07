
/**
 * Makes a request to a webhook endpoint with the provided parameters
 */
export const executeWebhookRequest = async ({
  params,
  contentKey,
  contentValue,
  webhookUrl,
  useNoCors = false,
  timeoutSeconds = 90
}) => {
  // Create a query string from the parameters
  const queryParams = new URLSearchParams();
  
  // Add all params to query string
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }

  // Add content if provided
  if (contentKey && contentValue) {
    queryParams.append(contentKey, contentValue);
  }

  // Construct the full URL with query params
  const fullUrl = `${webhookUrl}?${queryParams.toString()}`;
  console.log('Executing webhook request to:', fullUrl);
  console.log('Waiting up to', timeoutSeconds, 'seconds for response');

  // Create a timeout promise
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${timeoutSeconds} seconds`));
    }, timeoutSeconds * 1000);
  });

  try {
    // First try a standard CORS request
    try {
      console.log('Attempting standard CORS request...');
      
      // Race between the fetch and the timeout
      const response = await Promise.race([
        fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        }),
        timeout
      ]) as Response;

      // If we reach here, the request worked with CORS
      console.log('Standard request succeeded with status:', response.status);
      
      // Parse response
      const rawResponse = await response.text();
      console.log('Raw response received:', rawResponse.substring(0, 100) + (rawResponse.length > 100 ? '...' : ''));
      
      try {
        // Try to parse as JSON
        const responseData = JSON.parse(rawResponse);
        console.log('Successfully parsed JSON response:', responseData);
        return {
          success: response.ok,
          status: response.status,
          data: responseData,
          rawResponse
        };
      } catch (e) {
        // If not JSON, use the raw text
        console.log('Response is not valid JSON, using raw text');
        return {
          success: response.ok,
          status: response.status,
          data: rawResponse,
          rawResponse
        };
      }
    } catch (corsError) {
      // If CORS fails and we haven't tried no-cors yet, try with no-cors
      console.error('CORS request failed:', corsError);
      console.log('Falling back to no-cors mode...');
      
      if (useNoCors) {
        console.log('Making request with no-cors mode');
        const response = await Promise.race([
          fetch(fullUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            mode: 'no-cors'
          }),
          timeout
        ]) as Response;

        console.log('No-cors request completed (status details unavailable in no-cors)');
        return {
          success: true, // We assume success since no-cors doesn't give us status
          data: null,
          rawResponse: 'No response available in no-cors mode'
        };
      } else {
        // If useNoCors is false, just throw the original error
        throw corsError;
      }
    }
  } catch (error) {
    console.error('Webhook request failed:', error);
    throw error;
  }
};
