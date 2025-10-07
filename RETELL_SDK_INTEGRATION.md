# Retell SDK Integration Documentation

## Overview

This document outlines the complete integration of the Retell AI SDK into the Leo Voice Agent landing page project. The integration enables real-time voice conversations with AI agents directly through the web interface.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Component Structure](#component-structure)
- [API Integration](#api-integration)
- [UI Integration](#ui-integration)
- [Environment Variables](#environment-variables)
- [Usage Flow](#usage-flow)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)

## Installation

### Package Installation

```bash
npm install retell-client-js-sdk
```

### Dependencies

The Retell SDK requires the following peer dependencies:
- React 18+
- TypeScript (optional but recommended)

## Configuration

### Configuration File

Created `src/config/retell.ts` with the following structure:

```typescript
export const RETELL_CONFIG = {
  // Retell API Base URL
  BASE_URL: 'https://api.retellai.com',
  
  // Retell API Key - Get this from your Retell Dashboard
  API_KEY: import.meta.env.VITE_RETELL_API_KEY || '',
  
  // Default Agent ID - Replace with your actual Retell agent ID
  DEFAULT_AGENT_ID: import.meta.env.VITE_RETELL_AGENT_ID || '',
  
  // Agent Configuration
  AGENT_NAME: 'Leo Voice Agent',
  
  // Sample rate for audio (24kHz is recommended for best quality)
  SAMPLE_RATE: 24000,
  
  // Enable backchannel (AI can make sounds like "uh-huh" while listening)
  ENABLE_BACKCHANNEL: true,
};
```

### Environment Variables

Add the following variables to your `.env` file:

```env
# Retell AI Voice Agent Configuration
VITE_RETELL_API_KEY=your-retell-api-key-here
VITE_RETELL_AGENT_ID=your-retell-agent-id-here
```

## Component Structure

### VoiceDemo Component

The main component handling voice interactions is located at `src/components/VoiceDemo.tsx`.

#### Props Interface

```typescript
interface VoiceDemoProps {
  agentId: string;
  agentName?: string;
  onClose?: () => void;
}
```

#### State Management

```typescript
const [isCalling, setIsCalling] = useState(false);
const [isMuted, setIsMuted] = useState(false);
const [error, setError] = useState<string | null>(null);
const [isConnecting, setIsConnecting] = useState(false);
const retellClientRef = useRef<RetellWebClient | null>(null);
```

## API Integration

### WebRTC Call Creation

```typescript
const startVoiceCall = async () => {
  try {
    setError(null);
    setIsConnecting(true);
    
    // Create WebRTC call using Retell API V2
    const response = await fetch(`${RETELL_CONFIG.BASE_URL}/v2/create-web-call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        sample_rate: 24000,
        enable_backchannel: true,
        dynamic_variables: []
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const callData = await response.json();
    
    // Initialize Retell Web Client
    const retellClient = new RetellWebClient();
    retellClientRef.current = retellClient;

    // Set up event listeners
    retellClient.on('call_started', () => {
      setIsConnecting(false);
      setIsCalling(true);
    });

    retellClient.on('call_ended', () => {
      setIsCalling(false);
      setIsConnecting(false);
    });

    retellClient.on('error', (error: any) => {
      setError(`Call error: ${error.message || 'Unknown error'}`);
      setIsConnecting(false);
      setIsCalling(false);
    });

    // Start the call with the access token
    await retellClient.startCall({
      accessToken: callData.access_token,
    });
    
  } catch (err) {
    console.error('Error starting voice call:', err);
    setError(`Unable to start voice call: ${err instanceof Error ? err.message : 'Unknown error'}`);
    setIsConnecting(false);
    setIsCalling(false);
  }
};
```

### Call Management

```typescript
const endCall = async () => {
  try {
    if (retellClientRef.current) {
      await retellClientRef.current.stopCall();
    }
  } catch (err) {
    console.error('Error ending call:', err);
  }
  
  setIsCalling(false);
  setIsMuted(false);
  setError(null);
  setIsConnecting(false);
  retellClientRef.current = null;
  
  // Close the modal
  if (onClose) {
    onClose();
  }
};
```

## UI Integration

### Modal Interface

The voice demo is presented as a modal overlay with three states:

1. **Initial State**: Call-to-action button to start voice call
2. **Connecting State**: Loading indicator while establishing connection
3. **Calling State**: Active call interface with controls

### Button Integration

Connected to multiple buttons across the application:

#### Header Component
```typescript
<button
  onClick={onStartVoiceDemo || (() => alert('Voice demo not available'))}
  className="bg-[#F7EF00] text-[#1E293B] px-6 py-2 rounded-full font-semibold hover:bg-[#F7EF00]/90 transition-all duration-200 hover:scale-105 flex items-center space-x-2"
>
  <Phone className="w-4 h-4" />
  <span>Try Leo Free</span>
</button>
```

#### Hero Component
```typescript
<button 
  onClick={onStartVoiceDemo || (() => alert('Voice demo not available'))} 
  className="bg-[#F7EF00] text-[#1E293B] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#F7EF00]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center space-x-2 group"
>
  <span>Let Leo take your next call</span>
  <span className="group-hover:translate-x-1 transition-transform">→</span>
</button>
```

#### Testimonials Component
```typescript
<button 
  onClick={onStartVoiceDemo || (() => alert('Voice demo not available'))} 
  className="bg-[#F7EF00] text-[#1E293B] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#F7EF00]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center space-x-2 group"
>
  <span>Let Leo take your next call</span>
  <span className="group-hover:translate-x-1 transition-transform">→</span>
</button>
```

### App Component Integration

```typescript
// State management for voice demo modal
const [showVoiceDemo, setShowVoiceDemo] = useState(false);

const handleStartVoiceDemo = () => {
  setShowVoiceDemo(true);
};

const handleCloseVoiceDemo = () => {
  setShowVoiceDemo(false);
};

// Modal rendering
{showVoiceDemo && (
  <VoiceDemo
    agentId={RETELL_CONFIG.DEFAULT_AGENT_ID}
    agentName={RETELL_CONFIG.AGENT_NAME}
    onClose={handleCloseVoiceDemo}
  />
)}
```

## Usage Flow

### Complete User Journey

1. **User visits landing page**
2. **User clicks** any voice demo button (Header, Hero, or Testimonials)
3. **Modal opens** with voice call interface
4. **User clicks** "Start Voice Call" button
5. **System creates** WebRTC session with Retell API
6. **Connection established** and call begins
7. **User speaks** and AI responds in real-time
8. **User can mute/unmute** or end call
9. **Call ends** and modal closes

### State Transitions

```
Initial → Connecting → Calling → Ended
   ↓         ↓          ↓        ↓
Button   Loading    Active   Closed
Click    Spinner    Call     Modal
```

## Error Handling

### API Error Handling

```typescript
if (!response.ok) {
  const errorText = await response.text();
  console.error('API Error Response:', errorText);
  throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
}
```

### Client Error Handling

```typescript
retellClient.on('error', (error: any) => {
  console.error('Retell client error:', error);
  setError(`Call error: ${error.message || 'Unknown error'}`);
  setIsConnecting(false);
  setIsCalling(false);
});
```

### User-Facing Error Messages

- **API Errors**: "Unable to start voice call: [error message]"
- **Client Errors**: "Call error: [error message]"
- **Network Errors**: "Something went wrong. Please try again later."

## Troubleshooting

### Common Issues

#### 1. "Not Found" Error (404)
- **Cause**: Missing or incorrect API credentials
- **Solution**: Verify `VITE_RETELL_API_KEY` and `VITE_RETELL_AGENT_ID` in `.env` file

#### 2. "Invalid API Key" Error
- **Cause**: Incorrect API key format
- **Solution**: Ensure API key starts with "Key_" and is copied correctly from Retell Dashboard

#### 3. "Agent Not Found" Error
- **Cause**: Invalid Agent ID
- **Solution**: Verify Agent ID in Retell Dashboard and update environment variable

#### 4. WebRTC Connection Issues
- **Cause**: Browser permissions or network issues
- **Solution**: Check microphone permissions and network connectivity

### Debug Mode

Enable debug logging by adding to your `.env`:

```env
VITE_DEBUG_RETELL=true
```

### Browser Compatibility

The Retell SDK requires:
- Modern browsers with WebRTC support
- HTTPS connection (required for microphone access)
- Microphone permissions

## Security Considerations

### API Key Security
- Store API keys in environment variables only
- Never commit API keys to version control
- Use different keys for development and production

### User Privacy
- Microphone access is only used during active calls
- No audio data is stored locally
- All voice processing happens through Retell's secure infrastructure

## Performance Optimization

### Audio Quality
- 24kHz sample rate for optimal quality/performance balance
- Backchannel enabled for natural conversation flow
- Automatic audio compression and optimization

### Memory Management
- Proper cleanup of Retell client on component unmount
- Event listener cleanup to prevent memory leaks
- State reset on modal close

## Future Enhancements

### Potential Improvements
- Custom audio visualization during calls
- Call recording and playback
- Multiple agent support
- Advanced call analytics
- Integration with CRM systems

### Scalability Considerations
- Agent load balancing
- Rate limiting implementation
- Error monitoring and alerting
- Performance metrics collection

---

## Support

For technical support or questions about this integration:

1. Check the [Retell AI Documentation](https://retellai.com/docs)
2. Review error logs in browser console
3. Verify environment variables are correctly set
4. Test with different browsers and devices

---

**Last Updated**: September 2025  
**Version**: 1.0.0  
**Maintainer**: Leo Voice Agent Development Team
