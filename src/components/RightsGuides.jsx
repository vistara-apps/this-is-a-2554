import React, { useState, useEffect } from 'react';
import { 
  Car, 
  MessageSquare, 
  Home, 
  Users, 
  ChevronDown,
  Globe,
  AlertCircle,
  CheckCircle,
  Search
} from 'lucide-react';
import { getRightsData, validateStateData } from '../utils/legalDataHelpers';

const RightsGuides = ({ user }) => {
  const [selectedScenario, setSelectedScenario] = useState('traffic-stop');
  const [selectedLanguage, setSelectedLanguage] = useState(user.preferredLanguage || 'en');
  const [rightsData, setRightsData] = useState(null);
  const [stateValidation, setStateValidation] = useState(null);

  const scenarios = [
    {
      id: 'traffic-stop',
      title: 'Traffic Stop',
      icon: Car,
      description: 'Your rights during police traffic stops'
    },
    {
      id: 'questioning',
      title: 'Police Questioning',
      icon: MessageSquare,
      description: 'How to handle police questioning'
    },
    {
      id: 'home-search',
      title: 'Home Search',
      icon: Home,
      description: 'Your rights when police want to search your home'
    },
    {
      id: 'public-interaction',
      title: 'Public Interaction',
      icon: Users,
      description: 'Rights during public encounters with police'
    }
  ];

  // Load rights data when scenario or language changes
  useEffect(() => {
    if (user.selectedState) {
      const validation = validateStateData(user.selectedState);
      setStateValidation(validation);
      
      const data = getRightsData(user.selectedState, selectedScenario, selectedLanguage);
      setRightsData(data);
    }
  }, [user.selectedState, selectedScenario, selectedLanguage]);

  // Use dynamic rights data or fallback to loading state
  if (!rightsData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-effect rounded-xl p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading rights information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Know Your Rights
            </h1>
            <div className="flex items-center space-x-2">
              <p className="text-white/80">State-specific guides for {user.selectedState}</p>
              {stateValidation && !stateValidation.isValid && (
                <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Using default data</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-1">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedLanguage === 'en' 
                  ? 'bg-white text-gray-900' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('es')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedLanguage === 'es' 
                  ? 'bg-white text-gray-900' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Español
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`glass-effect rounded-xl p-4 text-left transition-all duration-200 ${
                selectedScenario === scenario.id 
                  ? 'bg-white/30 ring-2 ring-white/50' 
                  : 'hover:bg-white/20'
              }`}
            >
              <Icon className="h-8 w-8 text-white mb-3" />
              <h3 className="font-semibold text-white mb-1">{scenario.title}</h3>
              <p className="text-white/70 text-sm">{scenario.description}</p>
            </button>
          );
        })}
      </div>

      {/* Guide Content */}
      <div className="space-y-6">
        {/* What To Do */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-6 w-6 text-success" />
            <h2 className="text-xl font-semibold text-white">
              {selectedLanguage === 'en' ? 'What To Do' : 'Qué Hacer'}
            </h2>
          </div>
          <ul className="space-y-3">
            {rightsData.whatToDo.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What NOT To Say */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-6 w-6 text-danger" />
            <h2 className="text-xl font-semibold text-white">
              {selectedLanguage === 'en' ? 'What NOT To Say' : 'Qué NO Decir'}
            </h2>
          </div>
          <ul className="space-y-3">
            {rightsData.whatNotToSay.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-danger rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scripts */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-semibold text-white">
              {selectedLanguage === 'en' ? 'What To Say' : 'Qué Decir'}
            </h2>
          </div>
          <div className="space-y-3">
            {rightsData.scripts.map((script, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <p className="text-white font-medium">{script}</p>
              </div>
            ))}
          </div>
        </div>

        {/* State Laws */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">
              {user.selectedState} Laws
            </h2>
          </div>
          <ul className="space-y-3">
            {rightsData.stateLaws.map((law, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-white/90">{law}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightsGuides;
