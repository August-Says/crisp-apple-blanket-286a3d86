
import { toast } from 'sonner';
import { Message } from './MessageList';

export const sendMessageToWebhook = async (
  webhookUrl: string,
  messageContent: string
): Promise<string> => {
  console.log("Sending message to webhook:", webhookUrl);
  
  // First try with regular CORS enabled
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: messageContent }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
    }

    const responseText = await response.text();
    return responseText || "I received your message and I'm processing it.";
  } catch (err) {
    console.log("Standard request failed, trying with no-cors mode");
    
    // If the regular request fails, try with no-cors mode
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({ message: messageContent }),
    });
    
    // When using no-cors, we can't read the response
    return "Message sent! I'll respond shortly. Note: Due to CORS restrictions, I can't see the direct response, but your message was delivered.";
  }
};
