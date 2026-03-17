import { NextResponse } from "next/server";
import { locations, tasks } from "@/data/mockData";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback if no API key is provided for demo purposes
      const lowercasePrompt = prompt.toLowerCase();
      if (lowercasePrompt.includes("id card")) {
        return NextResponse.json({ 
          text: "Location: Admin Block\nRoom: Room 101\nTiming: 10 AM - 4 PM\nSteps: Submit Admission Slip and Photo." 
        });
      }
      if (lowercasePrompt.includes("library")) {
        return NextResponse.json({ 
          text: "Location: Central Library\nRoom: Ground Floor\nTiming: 9 AM - 8 PM\nSteps: Carry your ID Card for access." 
        });
      }
      return NextResponse.json({ 
        text: "I'm currently in demo mode without an API key. You can ask about 'ID card' or 'Library' to see sample responses." 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = ` 
 You are a campus assistant for Galgotias University. 
 
 Answer ONLY from given campus data. 
 
 Format: 
 Location: 
 Room: 
 Timing: 
 Steps: 
 
 Do not give random answers. 
 
 Campus Data:
 Locations: ${JSON.stringify(locations)}
 Tasks: ${JSON.stringify(tasks)}
 `;

    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
