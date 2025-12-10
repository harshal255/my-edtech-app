/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateDescription(title: string, category: string) {
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

      const prompt = `Write a short, professional, and engaging description (maximum 30 words) for a developer resource titled "${title}" which belongs to the category "${category}". Do not use markdown or quotes.`;

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
