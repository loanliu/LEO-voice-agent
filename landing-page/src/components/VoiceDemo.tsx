import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mic, MicOff, PhoneOff } from 'lucide-react';
import { RETELL_CONFIG } from '../config/retell';
import { RetellWebClient } from 'retell-client-js-sdk';

interface VoiceDemoProps {
  agentId: string;
  agentName?: string;
  onClose?: () => void;
}

const VoiceDemo: React.FC<VoiceDemoProps> = ({ 
  agentId,
  agentName = 'AI Voice Agent',
  onClose
}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const retellClientRef = useRef<RetellWebClient | null>(null);

  const startVoiceCall = async () => {
    try {
      setError(null);
      setIsConnecting(true);
      
      console.log('Starting voice call with agent:', agentId);
      
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
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const callData = await response.json();
      console.log('WebRTC call created:', callData);

      // Initialize Retell Web Client
      const retellClient = new RetellWebClient();
      retellClientRef.current = retellClient;

      // Set up event listeners
      retellClient.on('call_started', () => {
        console.log('Call started successfully');
        setIsConnecting(false);
        setIsCalling(true);
      });

      retellClient.on('call_ended', () => {
        console.log('Call ended');
        setIsCalling(false);
        setIsConnecting(false);
      });

      retellClient.on('error', (error: any) => {
        console.error('Retell client error:', error);
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

  const endCall = async () => {
    try {
      if (retellClientRef.current) {
        await retellClientRef.current.stopCall();
        console.log('Call ended successfully');
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retellClientRef.current) {
        try {
          retellClientRef.current.stopCall();
        } catch (err) {
          console.error('Error stopping call on unmount:', err);
        }
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Note: Mute functionality will be handled by the Retell SDK internally
    console.log('Mute toggled:', !isMuted);
  };

  if (isConnecting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Phone className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Connecting to {agentName}...
              </h3>
              <p className="text-gray-600">
                Please wait while we establish the connection
              </p>
            </div>
            
            <button
              onClick={endCall}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isCalling) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Connected to {agentName}
              </h3>
              <p className="text-gray-600">
                Speak naturally - the AI will respond to your questions
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-colors ${
                  isMuted 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </button>
              
              <button
                onClick={endCall}
                className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
            </div>

            <div className="text-sm text-gray-500">
              <p>Connected to your Retell AI agent</p>
              <p>Speak naturally - the AI will respond in real-time</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Try {agentName}
            </h3>
            <p className="text-gray-600">
              Experience our AI voice agent in action
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={startVoiceCall}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              Start Voice Call
            </button>
            
            {onClose && (
              <button
                onClick={onClose}
                className="w-full bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceDemo;
