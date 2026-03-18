import { NextResponse } from "next/server";
import { locations, tasks } from "@/data/mockData";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Handle both 'prompt' and 'message' to be safe
    const prompt = body.prompt || body.message || "";
    const query = prompt.toLowerCase().trim();

    if (!query) {
      return Response.json({ text: "Please ask a question about the campus." });
    }

    // ✅ 1. Check task (improved matching)
    const taskMatch = tasks.find(t => {
      const taskName = t.task.toLowerCase();
      return query.includes(taskName) || taskName.includes(query);
    });

    if (taskMatch) {
      return Response.json({
        text: `Location: ${taskMatch.location}\nRoom: ${taskMatch.room}\nTiming: ${taskMatch.timing}\nDocuments: ${taskMatch.documents.join(", ")}`
      });
    }

    // ✅ 2. Check location (improved matching)
    const locationMatch = locations.find(l => {
      const locName = l.name.toLowerCase();
      return query.includes(locName) || locName.includes(query);
    });

    if (locationMatch) {
      return Response.json({
        text: `Location: ${locationMatch.name}\nBlock: ${locationMatch.block}\nRoom: ${locationMatch.room}\nServices: ${locationMatch.services.join(", ")}\nTiming: ${locationMatch.timing}`
      });
    }

    const message = prompt;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ text: "I'm currently in demo mode without an API key. Try asking about Admin Block or ID card." });
    }

    // Add Galgotias University context to the AI fallback
    const aiPrompt = `
      You are a campus assistant for Galgotias University. 
      Use this data to answer if relevant:
      Locations: ${JSON.stringify(locations)}
      Tasks: ${JSON.stringify(tasks)}
      
      User Question: ${message}
      
      If the answer is in the data, use it. If not, try to answer generally about Galgotias University or suggest visiting the Admin Block.
      Keep it concise and follow this format:
      Location: 
      Room: 
      Timing: 
      Steps/Info:
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: aiPrompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't find specific information about that. Try asking about the Admin Block, ID card, or Library.";

    return Response.json({ text });
  } catch (error: any) {
    console.error("AI Error:", error);
    return Response.json({ text: "I encountered an error while processing your request. Please try again later." });
  }
}
