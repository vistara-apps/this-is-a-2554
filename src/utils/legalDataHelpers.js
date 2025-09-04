import { getStateRights, hasStateData, getAvailableStates } from '../data/stateRights';

// Scenario mapping for different interaction types
export const scenarioMapping = {
  'traffic-stop': 'trafficStop',
  'questioning': 'questioning',
  'home-search': 'homeSearch',
  'public-interaction': 'publicInteraction'
};

// Get comprehensive rights data for a specific state and scenario
export const getRightsData = (stateName, scenarioId, language = 'en') => {
  const scenario = scenarioMapping[scenarioId] || 'trafficStop';
  const rightsData = getStateRights(stateName, scenario);
  
  if (!rightsData) {
    return null;
  }

  return {
    whatToDo: rightsData.whatToDo?.[language] || rightsData.whatToDo?.en || [],
    whatNotToSay: rightsData.whatNotToSay?.[language] || rightsData.whatNotToSay?.en || [],
    scripts: rightsData.scripts?.[language] || rightsData.scripts?.en || [],
    stateLaws: rightsData.stateLaws || [],
    scenario: scenarioId,
    state: stateName,
    language: language
  };
};

// Validate if state has comprehensive data
export const validateStateData = (stateName) => {
  if (!hasStateData(stateName)) {
    return {
      isValid: false,
      message: `No legal data available for ${stateName}. Using default information.`,
      fallbackState: 'California'
    };
  }

  return {
    isValid: true,
    message: `Legal data available for ${stateName}`,
    fallbackState: null
  };
};

// Get formatted state laws for display
export const formatStateLaws = (laws) => {
  return laws.map(law => {
    const parts = law.split(' - ');
    return {
      code: parts[0] || law,
      description: parts[1] || '',
      fullText: law
    };
  });
};

// Search for specific rights information
export const searchRights = (query, stateName, language = 'en') => {
  const results = [];
  const scenarios = ['trafficStop', 'questioning'];
  
  scenarios.forEach(scenario => {
    const data = getStateRights(stateName, scenario);
    if (!data) return;

    // Search in what to do
    data.whatToDo?.[language]?.forEach((item, index) => {
      if (item.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'whatToDo',
          scenario,
          content: item,
          index
        });
      }
    });

    // Search in scripts
    data.scripts?.[language]?.forEach((item, index) => {
      if (item.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'scripts',
          scenario,
          content: item,
          index
        });
      }
    });

    // Search in state laws
    data.stateLaws?.forEach((item, index) => {
      if (item.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'stateLaws',
          scenario,
          content: item,
          index
        });
      }
    });
  });

  return results;
};

// Get emergency phrases in multiple languages
export const getEmergencyPhrases = (language = 'en') => {
  const phrases = {
    en: [
      "I am exercising my right to remain silent.",
      "I want to speak to an attorney.",
      "Am I free to go?",
      "I do not consent to any searches.",
      "I am recording this interaction for my safety."
    ],
    es: [
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "Quiero hablar con un abogado.",
      "¿Soy libre de irme?",
      "No consiento ningún registro.",
      "Estoy grabando esta interacción por mi seguridad."
    ]
  };

  return phrases[language] || phrases.en;
};

// Generate a quick reference card for a specific scenario
export const generateQuickReference = (stateName, scenarioId, language = 'en') => {
  const data = getRightsData(stateName, scenarioId, language);
  if (!data) return null;

  return {
    title: `${scenarioId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Rights - ${stateName}`,
    sections: [
      {
        title: language === 'es' ? 'Qué Hacer' : 'What To Do',
        items: data.whatToDo,
        icon: '✅'
      },
      {
        title: language === 'es' ? 'Qué NO Hacer' : 'What NOT To Do',
        items: data.whatNotToSay,
        icon: '❌'
      },
      {
        title: language === 'es' ? 'Qué Decir' : 'What To Say',
        items: data.scripts,
        icon: '💬'
      },
      {
        title: language === 'es' ? 'Leyes del Estado' : 'State Laws',
        items: data.stateLaws,
        icon: '⚖️'
      }
    ],
    metadata: {
      state: stateName,
      scenario: scenarioId,
      language: language,
      generated: new Date().toISOString()
    }
  };
};

// Check if user's state has complete data coverage
export const getStateCoverage = (stateName) => {
  const availableStates = getAvailableStates();
  const hasData = hasStateData(stateName);
  
  return {
    hasData,
    isSupported: availableStates.includes(stateName),
    totalStates: availableStates.length,
    coverage: (availableStates.length / 50) * 100 // Assuming 50 US states
  };
};

export default {
  getRightsData,
  validateStateData,
  formatStateLaws,
  searchRights,
  getEmergencyPhrases,
  generateQuickReference,
  getStateCoverage
};

