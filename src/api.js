import Anthropic from '@anthropic-ai/sdk';
import { MOCK_USER, SYSTEM_PROMPT } from './data';

export const getApiKey = () => {
  return localStorage.getItem('anthropic_api_key') || '';
};

export const setApiKey = (key) => {
  localStorage.setItem('anthropic_api_key', key);
};

export const callClaude = async (prompt, maxTokens = 500) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Please set your Anthropic API Key first.");
  }

  const anthropic = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: maxTokens,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error("Claude API Error:", error);
    throw error;
  }
};
