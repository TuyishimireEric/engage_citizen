import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { complaintText, availableCategories } = await request.json();

    if (!complaintText || complaintText.trim() === "") {
      return NextResponse.json(
        { error: "No complaint text provided" },
        { status: 400 }
      );
    }

    if (
      !availableCategories ||
      !Array.isArray(availableCategories) ||
      availableCategories.length === 0
    ) {
      return NextResponse.json(
        { error: "Available categories must be a non-empty array" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            `You are a complaint categorization system. Your job is to analyze a complaint and categorize it into EXACTLY ONE of the following categories: ${availableCategories.join(
              ", "
            )}. ` +
            `If the complaint doesn't fit any category, respond with "unknown". ` +
            `The complaint may be in any language - translate if needed. ` +
            `Respond ONLY with the category name or "unknown" - no explanations, no additional text.`,
        },
        {
          role: "user",
          content: complaintText,
        },
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    // Extract the result
    const categoryResult =
      response.choices[0]?.message.content?.trim() || "unknown";

    // Validate that the result is an available category or "unknown"
    if (
      categoryResult !== "unknown" &&
      !availableCategories.includes(categoryResult)
    ) {
      console.warn(
        `OpenAI returned an unexpected category: ${categoryResult}. Defaulting to "unknown".`
      );
      return NextResponse.json("unknown");
    }

    return NextResponse.json(categoryResult);
  } catch (error) {
    console.error("Error analyzing complaint:", error);
    return NextResponse.json(
      { error: "Failed to analyze complaint", category: "unknown" },
      { status: 500 }
    );
  }
}
