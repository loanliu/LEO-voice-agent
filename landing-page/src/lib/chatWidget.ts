// Utility to load and interact with the external chat widget
export interface ChatWidgetGlobal {
  open: () => void;
}

interface ChatWidgetConfig {
  projectId: string;
}

declare global {
  interface Window {
    ChatWidget?: ChatWidgetGlobal;
    ChatWidgetConfig?: ChatWidgetConfig;
    chatWidgetScriptLoaded?: boolean;
  }
}

let loadPromise: Promise<void> | null = null;

export function loadChatWidget(): Promise<void> {
  if (loadPromise) return loadPromise;

  const projectId = import.meta.env.VITE_CHAT_WIDGET_PROJECT_ID;
  
  if (!projectId) {
    return Promise.reject(new Error('Chat widget project ID not configured. Please set VITE_CHAT_WIDGET_PROJECT_ID in your .env file.'));
  }

  loadPromise = new Promise((resolve, reject) => {
    if (window.chatWidgetScriptLoaded) {
      resolve();
      return;
    }

    // Set the configuration before loading the script
    window.ChatWidgetConfig = {
      projectId: projectId,
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://storage.googleapis.com/cdwidget/dist/assets/js/main.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load chat widget'));
    document.body.appendChild(script);

    window.chatWidgetScriptLoaded = true;
  });

  return loadPromise;
}

export async function openVoiceChat(): Promise<void> {
  await loadChatWidget();
  window.ChatWidget?.open();
}
