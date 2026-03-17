import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "dummy-gemini-key";
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
};

export const chatWithGemini = async (prompt: string, context?: string) => {
  const model = getGeminiModel();
  const fullPrompt = context 
    ? `Context: ${context}\n\nUser Question: ${prompt}\n\nPlease respond based on the campus information provided. If you don't know the answer, say you don't know and suggest visiting the Administrative Block.`
    : prompt;
    
  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  return response.text();
};
