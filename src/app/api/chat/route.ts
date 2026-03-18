import { NextResponse } from "next/server";
import { locations, tasks } from "@/data/mockData";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || body.message || "";
    const query = prompt.toLowerCase().trim();

    if (!query) {
      return NextResponse.json({ text: "Please ask a question about the campus." });
    }

    // ✅ 1. Check task (improved matching)
    const taskMatch = tasks.find(t => {
      const taskName = t.task.toLowerCase();
      const keywords = taskName.split(" ");
      return query.includes(taskName) || keywords.some(kw => kw.length > 2 && query.includes(kw));
    });

    if (taskMatch) {
      return NextResponse.json({
        text: `**Task Found:** ${taskMatch.task}\n\n**Location:** ${taskMatch.location}\n**Room:** ${taskMatch.room}\n**Timing:** ${taskMatch.timing}\n**Documents Required:**\n- ${taskMatch.documents.join("\n- ")}`
      });
    }

    // ✅ 2. Check location (improved matching)
    const locationMatch = locations.find(l => {
      const locName = l.name.toLowerCase();
      const locId = l.id.toLowerCase();
      const keywords = ["library", "librayi", "cafeteria", "canteen", "sports", "gym", "admin", "examination", "hostel", "mess", "agriculture", "drone", "parking"];
      
      const matchedKeyword = keywords.find(kw => query.includes(kw));
      if (matchedKeyword && locName.includes(matchedKeyword)) return true;

      // Handle A Block and AI & DS Block separately
      if (query.includes("ai & ds") || query.includes("artificial intelligence")) {
        if (locId === "block-aids") return true;
      } else if (query.includes("a block")) {
        if (locId === "block-a") return true;
      }
      
      return query.includes(locName) || locName.includes(query) || query.includes(locId);
    });

    if (locationMatch) {
      return NextResponse.json({
        text: `**Location Found:** ${locationMatch.name}\n\n**Block:** ${locationMatch.block}\n**Room:** ${locationMatch.room}\n**Timing:** ${locationMatch.timing}\n**Services:** ${locationMatch.services.join(", ")}`
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        text: "I'm currently in demo mode. I can help with specific campus locations like the Administrative Block, Library, or Cafeteria. For full AI capabilities, please configure the API key." 
      });
    }

    // Add Galgotias University context to the AI fallback
    const systemInstruction = `
      You are "Beacon AI", the official campus assistant for Galgotias University. 
      Your goal is to help students navigate the campus and complete administrative tasks.
      
      CONTEXT DATA:
      Locations: ${JSON.stringify(locations)}
      Tasks: ${JSON.stringify(tasks)}
      
      SPECIFIC CAMPUS INFO:
      - A Block is a standard academic block for general lectures and faculty.
      - AI & DS Block is the "Artificial Intelligence and Data Science Block". It is the most modern and advanced building on campus.
      - For anything related to AI, Machine Learning, or Advanced Computing, direct users to the AI & DS Block.
      - C Block is the hub for Management and Commerce studies.
      - The Hostel and Mess are located in the residential zone near the Sports Area.
      
      STRICT RULES:
      1. If the user asks about a location or task present in the CONTEXT DATA, use that data EXACTLY.
      2. Handle common Hinglish/Hinglish-English queries (e.g., "kaha hai", "kya documents chahiye", "librayi").
      3. Use the SPECIFIC CAMPUS INFO to provide more accurate answers for A Block and other departments.
      4. If the data is not present, answer generally about Galgotias University based on your knowledge.
      4. Always be polite, professional, and helpful.
      5. Use Markdown for formatting (bolding, lists).
      6. Keep responses concise (under 3 sentences unless listing steps).
      7. If you don't know the answer, suggest visiting the "Administrative Block" or "Reception".
      
      FORMAT FOR DATA ANSWERS:
      **Location:** [Name]
      **Room:** [Room Number/Floor]
      **Timing:** [Operating Hours]
      **Info:** [Brief description or steps]
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: systemInstruction
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text() || "I'm sorry, I couldn't find specific information about that. Try asking about the Admin Block, ID card, or Library.";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI Error:", error);
    return Response.json({ text: "I encountered an error while processing your request. Please try again later." });
  }
}
