import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const StateSelection = ({ onStateSelect }) => {
  const [selectedState, setSelectedState] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const detectLocation = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo purposes, we'll simulate detecting California
          // In a real app, you'd use a reverse geocoding API
          setTimeout(() => {
            setSelectedState('California');
            setIsDetectingLocation(false);
          }, 2000);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsDetectingLocation(false);
          alert('Could not detect location. Please select your state manually.');
        }
      );
    } else {
      setIsDetectingLocation(false);
      alert('Geolocation is not supported by this browser. Please select your state manually.');
    }
  };

  const handleContinue = () => {
    if (selectedState) {
      onStateSelect(selectedState);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to Zara Rights</h1>
            <p className="text-white/80">
              Get personalized rights information for your state
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={detectLocation}
              disabled={isDetectingLocation}
              className="w-full bg-white/20 hover:bg-white/30 disabled:bg-white/10 
                       text-white font-medium py-3 px-4 rounded-lg transition-colors
                       flex items-center justify-center space-x-2"
            >
              <MapPin className="h-5 w-5" />
              <span>
                {isDetectingLocation ? 'Detecting...' : 'Detect My Location'}
              </span>
            </button>

            <div className="text-white/60 text-sm">or</div>

            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white 
                         rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none 
                         focus:ring-2 focus:ring-white/30"
              >
                <option value="" className="text-gray-900">Select your state</option>
                {states.map((state) => (
                  <option key={state} value={state} className="text-gray-900">
                    {state}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 pointer-events-none" />
            </div>

            <button
              onClick={handleContinue}
              disabled={!selectedState}
              className="w-full bg-accent hover:bg-accent/90 disabled:bg-white/10 
                       disabled:text-white/50 text-white font-medium py-3 px-4 
                       rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateSelection;