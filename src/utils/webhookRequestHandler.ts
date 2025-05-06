
/**
 * Makes a request to a webhook endpoint with the provided parameters
 */
export const executeWebhookRequest = async ({
  params,
  contentKey,
  contentValue,
  webhookUrl,
  useNoCors = true
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

  try {
    // Make the request
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: useNoCors ? 'no-cors' : 'cors'
    });

    // When using no-cors mode, we can't read the response
    // This is because no-cors prevents JavaScript from seeing the response
    if (useNoCors) {
      console.log('Webhook request sent with no-cors mode. Cannot parse response.');
      return {
        success: true,
        data: null,
        rawResponse: 'No response available in no-cors mode'
      };
    }

    // If not using no-cors, try to parse the response
    let responseData;
    const rawResponse = await response.text();
    
    try {
      // Try to parse as JSON
      responseData = JSON.parse(rawResponse);
    } catch (e) {
      // If not JSON, use the raw text
      responseData = rawResponse;
    }

    return {
      success: response.ok,
      status: response.status,
      data: responseData,
      rawResponse
    };
  } catch (error) {
    console.error('Webhook request failed:', error);
    throw error;
  }
};
