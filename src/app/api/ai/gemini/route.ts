import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing Gemini API Key.");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: `API Error: ${response.status} - ${JSON.stringify(errorData)}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const fullText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received";

    const limitedText = fullText.split("\n").slice(0, 20).join("\n");

    return NextResponse.json({ content: limitedText });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
