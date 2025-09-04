import React, { useState } from 'react';
import { 
  Car, 
  MessageSquare, 
  Home, 
  Users, 
  ChevronDown,
  Globe,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const RightsGuides = ({ user }) => {
  const [selectedScenario, setSelectedScenario] = useState('traffic-stop');
  const [selectedLanguage, setSelectedLanguage] = useState(user.preferredLanguage || 'en');

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

  const trafficStopGuide = {
    whatToDo: {
      en: [
        'Pull over safely and turn off your engine',
        'Keep your hands visible on the steering wheel',
        'Provide license, registration, and insurance when asked',
        'Remain calm and polite',
        'You can record the interaction'
      ],
      es: [
        'Deténgase de manera segura y apague el motor',
        'Mantenga las manos visibles en el volante',
        'Proporcione licencia, registro y seguro cuando se lo pidan',
        'Manténgase calmado y cortés',
        'Puede grabar la interacción'
      ]
    },
    whatNotToSay: {
      en: [
        'Don\'t admit guilt or provide unnecessary information',
        'Don\'t consent to searches without a warrant',
        'Don\'t argue or become confrontational',
        'Don\'t reach for anything without announcing it first',
        'Don\'t lie to officers'
      ],
      es: [
        'No admita culpa ni proporcione información innecesaria',
        'No consienta búsquedas sin una orden judicial',
        'No discuta ni se vuelva confrontativo',
        'No alcance nada sin anunciarlo primero',
        'No mienta a los oficiales'
      ]
    },
    scripts: {
      en: [
        '"Officer, I am exercising my right to remain silent."',
        '"I do not consent to any searches."',
        '"Am I free to go?"',
        '"I would like to speak to an attorney."',
        '"I am recording this interaction for my safety."'
      ],
      es: [
        '"Oficial, estoy ejerciendo mi derecho a permanecer en silencio."',
        '"No consiento ningún registro."',
        '"¿Soy libre de irme?"',
        '"Me gustaría hablar con un abogado."',
        '"Estoy grabando esta interacción por mi seguridad."'
      ]
    },
    stateLaws: {
      [user.selectedState]: [
        'California Vehicle Code 2800 - Duty to stop for police',
        'Penal Code 148 - Obstructing or delaying a peace officer',
        'California Constitution Article 1, Section 13 - Privacy rights',
        'Vehicle Code 40804 - Officer must state reason for stop'
      ]
    }
  };

  const selectedGuide = trafficStopGuide; // For demo, using traffic stop guide

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Know Your Rights
            </h1>
            <p className="text-white/80">State-specific guides for {user.selectedState}</p>
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
            {selectedGuide.whatToDo[selectedLanguage].map((item, index) => (
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
            {selectedGuide.whatNotToSay[selectedLanguage].map((item, index) => (
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
            {selectedGuide.scripts[selectedLanguage].map((script, index) => (
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
            {selectedGuide.stateLaws[user.selectedState].map((law, index) => (
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