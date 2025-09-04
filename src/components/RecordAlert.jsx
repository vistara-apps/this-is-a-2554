import React, { useState, useRef } from 'react';
import { 
  Video, 
  Mic, 
  Square, 
  Phone, 
  Users, 
  MapPin,
  AlertTriangle,
  Download,
  Share
} from 'lucide-react';

const RecordAlert = ({ user }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState('video');
  const [recordingTime, setRecordingTime] = useState(0);
  const [alertSent, setAlertSent] = useState(false);
  const intervalRef = useRef(null);

  const startRecording = async () => {
    try {
      // Request media permissions
      const constraints = recordingType === 'video' 
        ? { video: true, audio: true }
        : { audio: true };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Send alert to trusted contacts
      if (user.trustedContacts.length > 0) {
        sendAlert();
      }

      // In a real app, you would start actual recording here
      console.log('Recording started with stream:', stream);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // In a real app, you would stop the actual recording here
    console.log('Recording stopped');
  };

  const sendAlert = () => {
    // In a real app, this would send SMS via Twilio or similar service
    setAlertSent(true);
    console.log('Alert sent to trusted contacts');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6 mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Instant Record & Alert
        </h1>
        <p className="text-white/80">
          One-tap recording with automatic alerts to trusted contacts
        </p>
      </div>

      {/* Recording Interface */}
      <div className="glass-effect rounded-xl p-8 mb-6">
        {!isRecording ? (
          <div className="text-center space-y-6">
            {/* Recording Type Selection */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setRecordingType('video')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  recordingType === 'video'
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Video className="h-5 w-5" />
                <span>Video</span>
              </button>
              <button
                onClick={() => setRecordingType('audio')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  recordingType === 'audio'
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Mic className="h-5 w-5" />
                <span>Audio</span>
              </button>
            </div>

            {/* Start Recording Button */}
            <button
              onClick={startRecording}
              className="w-32 h-32 bg-danger hover:bg-red-600 rounded-full 
                       flex items-center justify-center transition-all duration-200
                       shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {recordingType === 'video' ? (
                <Video className="h-12 w-12 text-white" />
              ) : (
                <Mic className="h-12 w-12 text-white" />
              )}
            </button>

            <p className="text-white font-medium">
              Tap to start {recordingType} recording
            </p>
          </div>
        ) : (
          <div className="text-center space-y-6">
            {/* Recording Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-danger rounded-full animate-pulse"></div>
              <span className="text-white font-medium">RECORDING</span>
            </div>

            {/* Timer */}
            <div className="text-4xl font-bold text-white mb-6">
              {formatTime(recordingTime)}
            </div>

            {/* Stop Button */}
            <button
              onClick={stopRecording}
              className="w-24 h-24 bg-gray-600 hover:bg-gray-700 rounded-full 
                       flex items-center justify-center transition-all duration-200"
            >
              <Square className="h-8 w-8 text-white" />
            </button>

            {/* Alert Status */}
            {alertSent && (
              <div className="bg-success/20 border border-success/30 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5 text-success" />
                  <span className="text-success font-medium">
                    Alert sent to trusted contacts
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trusted Contacts */}
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Trusted Contacts</h2>
        </div>
        
        {user.trustedContacts.length > 0 ? (
          <div className="space-y-2">
            {user.trustedContacts.map((contact, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-3">
                <p className="text-white font-medium">{contact.name}</p>
                <p className="text-white/70 text-sm">{contact.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-white/50 mx-auto mb-4" />
            <p className="text-white/70 mb-4">No trusted contacts added yet</p>
            <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg">
              Add Contacts
            </button>
          </div>
        )}
      </div>

      {/* Safety Tips */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Safety Tips</h2>
        </div>
        
        <ul className="space-y-2 text-white/90 text-sm">
          <li>• Keep your phone visible while recording</li>
          <li>• Announce that you are recording for safety</li>
          <li>• Stay calm and follow all lawful orders</li>
          <li>• Recording is your right in public spaces</li>
          <li>• Your recording will be automatically saved</li>
        </ul>
      </div>
    </div>
  );
};

export default RecordAlert;