import { GoogleGenAI } from '@google/genai';
import type { AnalysisResult, Source } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getMarketAnalysis(companyName: string): Promise<{ analysis: AnalysisResult; sources: Source[] }> {
  const prompt = `You are an expert AI market analyst.
Your task is to analyze the company "${companyName}" using the latest real-time NSE and BSE data retrieved from Google Search.
Perform the following tasks:
1. Identify the stock ticker symbol for the company on either NSE or BSE.
2. Get the latest stock price.
3. Generate a short-term technical analysis.
4. Generate a long-term technical analysis.
5. Provide a specific target price as a number.
6. Provide a specific stop-loss level as a number.
7. Summarize the current market trend in a single, concise line.
8. Generate a clear "Buy", "Sell", or "Hold" signal based on your overall technical and fundamental analysis.

Your response MUST be a single, valid JSON object that adheres to the following structure, with no extra text, comments, or markdown formatting:
{
  "tickerSymbol": "string",
  "currentPrice": number,
  "shortTermAnalysis": "string",
  "longTermAnalysis": "string",
  "targetPrice": number,
  "stopLoss": number,
  "marketTrend": "string",
  "signal": "string"
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.5,
      },
    });

    const jsonString = response.text;
    if (!jsonString) {
      throw new Error('Received an empty response from the AI model.');
    }
    
    // Clean potential markdown code block fences
    const cleanedJsonString = jsonString.replace(/^```json\s*|```$/g, '').trim();
    const analysis = JSON.parse(cleanedJsonString) as AnalysisResult;

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
      .map(chunk => chunk.web)
      .filter((web): web is { uri: string; title: string } => !!(web && web.uri && web.title))
      .map(web => ({ uri: web.uri, title: web.title }));

    return { analysis, sources };
  } catch (error) {
    console.error('Error fetching or parsing market analysis:', error);
    throw new Error('Failed to get analysis from Gemini API.');
  }
}