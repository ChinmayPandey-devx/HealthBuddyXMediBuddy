import { createContext, useState, useContext } from 'react';
import { MOCK_USER, SYSTEM_PROMPT } from './data';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [activeScreen, setActiveScreen] = useState('home');

  const callOpenAI = async (prompt, customMessages = null) => {
    if (!apiKey) throw new Error("API key missing.");

    const messages = customMessages || [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (response.status === 401) {
      throw new Error("Invalid API key (401 Unauthorized). Please check your key.");
    }
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  return (
    <AppContext.Provider value={{ apiKey, setApiKey, activeScreen, setActiveScreen, callOpenAI, user: MOCK_USER }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
