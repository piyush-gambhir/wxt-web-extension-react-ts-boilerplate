/**
 * Type-safe message passing system for Chrome extensions
 * Uses WXT's browser API which is available globally
 */

// Define your message types here
export interface MessageTypes {
  GET_TAB_INFO: {
    request: { tabId: number };
    response: { title: string; url: string };
  };
  UPDATE_BADGE: {
    request: { text: string; color: string };
    response: { success: boolean };
  };
  PING: {
    request: Record<string, never>;
    response: { pong: true };
  };
}

export type MessageType = keyof MessageTypes;

export interface Message<T extends MessageType> {
  type: T;
  data: MessageTypes[T]['request'];
}

export interface MessageResponse<T extends MessageType> {
  success: boolean;
  data?: MessageTypes[T]['response'];
  error?: string;
}

/**
 * Send a message to the background script
 */
export async function sendMessage<T extends MessageType>(
  type: T,
  data: MessageTypes[T]['request'],
): Promise<MessageTypes[T]['response']> {
  const message: Message<T> = { type, data };

  try {
    const response = await browser.runtime.sendMessage(message);

    if (!response.success) {
      throw new Error(response.error || 'Message failed');
    }

    return response.data;
  } catch (error) {
    console.error(`Error sending message "${type}":`, error);
    throw error;
  }
}

/**
 * Send a message to a specific tab
 */
export async function sendMessageToTab<T extends MessageType>(
  tabId: number,
  type: T,
  data: MessageTypes[T]['request'],
): Promise<MessageTypes[T]['response']> {
  const message: Message<T> = { type, data };

  try {
    const response = await browser.tabs.sendMessage(tabId, message);

    if (!response.success) {
      throw new Error(response.error || 'Message failed');
    }

    return response.data;
  } catch (error) {
    console.error(`Error sending message "${type}" to tab ${tabId}:`, error);
    throw error;
  }
}

/**
 * Listen for messages of a specific type
 */
export function onMessage<T extends MessageType>(
  type: T,
  handler: (
    data: MessageTypes[T]['request'],
    sender: Browser.runtime.MessageSender,
  ) => Promise<MessageTypes[T]['response']> | MessageTypes[T]['response'],
): () => void {
  const listener = async (
    message: Message<MessageType>,
    sender: Browser.runtime.MessageSender,
    sendResponse: (response: MessageResponse<T>) => void,
  ) => {
    if (message.type !== type) return false;

    try {
      const data = await handler(
        message.data as MessageTypes[T]['request'],
        sender,
      );
      sendResponse({ success: true, data });
    } catch (error) {
      console.error(`Error handling message "${type}":`, error);
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    return true; // Keep channel open for async response
  };

  browser.runtime.onMessage.addListener(listener);

  return () => browser.runtime.onMessage.removeListener(listener);
}
