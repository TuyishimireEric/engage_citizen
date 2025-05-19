import OpenAI from "openai";

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function analyzeComplaintCategory({
  complaintText,
  availableCategories,
}: {
  complaintText: string;
  availableCategories: string[];
}): Promise<string> {
  try {
    // Validate inputs
    if (!complaintText || complaintText.trim() === "") {
      throw new Error("No complaint text provided for analysis");
    }

    if (
      !availableCategories ||
      !Array.isArray(availableCategories) ||
      availableCategories.length === 0
    ) {
      throw new Error("Available categories must be a non-empty array");
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
      return "unknown";
    }

    return categoryResult;
  } catch (error) {
    console.error("Error analyzing complaint with OpenAI:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to analyze complaint"
    );
  }
}

// Example usage:
/*
const complaint = "Traffic lights are not working in my neighborhood for 3 days";
const categories = ["health", "police", "transport", "utilities", "education"];

analyzeComplaintCategory(complaint, categories)
  .then(category => console.log(`Complaint category: ${category}`))
  .catch(error => console.error(error));
*/
