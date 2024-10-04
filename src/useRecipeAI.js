import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const useRecipeAI = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const [hasResponse, setHasRespons] = useState(false);

  const genAI = new GoogleGenerativeAI(" ");

  const getResponseForGivenPrompt = async (prompt) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const promptResponse = await model.generateContent(prompt);
      const response = promptResponse.response;

      const text = await response.text();
      console.log(text)

      setResult(text);
      setHasRespons(true)

    } catch (error) {
      console.error("Something went wrong:", error);

    } finally {
        setLoading(false)
    }
  };

  return { result, loading, hasResponse, getResponseForGivenPrompt };
};
