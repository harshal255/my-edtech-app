/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateDescription(
  title: string,
  category: string,
  link: string
) {
  if (!title) return { error: "Please enter a title first." };

  // We try your specific available models in order of efficiency
  const modelsToTry = [
    "gemini-2.0-flash-lite", // Best balance of speed/quota
    "gemini-2.0-flash-lite-001", // Backup version
    "gemini-flash-lite-latest", // Generic latest alias
  ];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
        You are an expert developer assistant.
        I am adding a resource titled "${title}" which links to: "${link}".
        The category is "${category}".

        1. Write a detailed, engaging description (approx 60-80 words) for this specific resource.
        2. Explain why it is useful for developers.
        3. Since I provided the main link, please suggest 2 *other* related official documentation or tutorial URLs that would complement this resource.
        4. Format the output as plain text. Label the extra links as "Recommended Reading:".
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return { text };
    } catch (error: any) {
      // If busy or error, try the next one in the list
      console.log(
        `Skipping ${modelName} due to error:`,
        error.message?.split(" ")[0]
      );
      continue;
    }
  }

  return { error: "AI Service is busy. Please write description manually." };
}
