// Retell AI Voice Agent Configuration
export const RETELL_CONFIG = {
  // Retell API Base URL
  BASE_URL: 'https://api.retellai.com',
  
  // Retell API Key - Get this from your Retell Dashboard
  // Add this to your .env file as VITE_RETELL_API_KEY
  API_KEY: import.meta.env.VITE_RETELL_API_KEY || '',
  
  // Default Agent ID - Replace with your actual Retell agent ID
  // Add this to your .env file as VITE_RETELL_AGENT_ID
  DEFAULT_AGENT_ID: import.meta.env.VITE_RETELL_AGENT_ID || '',
  
  // Agent Configuration
  AGENT_NAME: 'Leo Voice Agent',
  
  // Sample rate for audio (24kHz is recommended for best quality)
  SAMPLE_RATE: 24000,
  
  // Enable backchannel (AI can make sounds like "uh-huh" while listening)
  ENABLE_BACKCHANNEL: true,
};

// Validate configuration
if (!RETELL_CONFIG.API_KEY) {
  console.warn('VITE_RETELL_API_KEY not found in environment variables. Voice demo will not work.');
}

if (!RETELL_CONFIG.DEFAULT_AGENT_ID) {
  console.warn('VITE_RETELL_AGENT_ID not found in environment variables. Voice demo will not work.');
}
