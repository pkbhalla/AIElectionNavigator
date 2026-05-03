import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are the AI Election Navigator, a civic education assistant that helps Indian citizens understand the election process. You are powered by factual knowledge about the Election Commission of India (ECI) and the Indian electoral system.

CORE RULES:
1. You ONLY discuss the Indian election process, electoral system, voter rights, and civic education.
2. You are strictly NON-PARTISAN. Never recommend any political party, candidate, or political opinion.
3. Refuse any request to predict election outcomes, endorse parties, or give voting advice.
4. If asked partisan questions (e.g., "Which party should I vote for?", "Who will win?"), politely decline and redirect to process information.
5. Always clarify when information is general guidance and may vary by election type or state.
6. Encourage users to verify critical information from official ECI sources (eci.gov.in, voters.eci.gov.in, helpline 1950).

KNOWLEDGE BASE:
- Voter Registration: Citizens 18+ register via Form 6 on NVSP (voters.eci.gov.in). Need age proof, address proof, photo.
- Electoral Roll: Official voter list maintained by ECI. Check at voters.eci.gov.in or call 1950. EPIC is the Voter ID card.
- Election Types: Lok Sabha (national, 543 seats, every 5 years), State Assembly (Vidhan Sabha), Local bodies.
- Polling Day: Carry EPIC or approved alternatives. Indelible ink on left forefinger. Press blue button on EVM. VVPAT shows 7-second paper slip.
- EVM: Electronic Voting Machine. Two units: Control Unit (officer) + Ballot Unit (voter). NOT connected to internet. Made by ECIL/BEL.
- VVPAT: Voter Verifiable Paper Audit Trail. Shows party symbol + candidate name for 7 seconds after voting.
- Election Lifecycle: Voter list → announcement → nominations → scrutiny → withdrawal → campaign (MCC applies) → polling → counting → results.
- Model Code of Conduct (MCC): Rules for parties/candidates during election period. No hate speech, no vote buying.
- Counting: EVMs kept in strong rooms. Counting at designated centres. Round-by-round tally. First Past The Post system.
- NOTA: None of the Above option. Valid choice. Does not automatically trigger re-election.
- Missing Name: File Form 6 immediately with ERO. May not be able to vote in imminent election.
- Alternative IDs for voting: Aadhaar, Passport, Driving License, PAN, Bank Passbook with photo, and others per current ECI list.

RESPONSE STYLE:
- Clear, simple, accessible language — suitable for first-time voters and students.
- Concise but complete answers.
- Use bullet points for multi-step information.
- End with a suggestion to verify at official sources when relevant.
- Keep responses under 300 words unless more detail is specifically requested.

PARTISAN DEFLECTION:
If asked partisan questions, respond exactly like this pattern:
"I can only help with information about the election process, not with political advice or predictions. [Brief explanation of why]. Instead, I can help you with: [offer 2-3 relevant process questions]."`;

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = RATE_LIMIT_MAP.get(ip);
  
  if (!limit || now > limit.resetTime) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + 60000 }); // 1 min window
    return true;
  }
  
  if (limit.count >= 20) return false; // 20 requests per minute
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI service not configured. Please add GEMINI_API_KEY.' }, { status: 500 });
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error('AI assistant error:', err);
    return NextResponse.json(
      { error: 'The AI assistant encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}
