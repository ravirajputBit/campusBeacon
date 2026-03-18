import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const chatWithGemini = async (prompt: string, systemPrompt?: string) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  // Use a more generic model name that works across different versions
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash-latest",
    systemInstruction: systemPrompt 
  });
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
