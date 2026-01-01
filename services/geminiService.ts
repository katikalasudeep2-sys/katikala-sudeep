
import { GoogleGenAI, Type } from "@google/genai";
import { ProfileInput, ProfileAnalysis } from "../types";

// The Google GenAI SDK requires direct use of process.env.API_KEY for initialization.
// We do not manage or request the key from the user as per security guidelines.

export const analyzeProfile = async (input: ProfileInput): Promise<ProfileAnalysis> => {
  // Always initialize GoogleGenAI using the process.env.API_KEY variable directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze this social media profile for authenticity:
    Username: ${input.username}
    Bio: ${input.bio}
    Network: ${input.followers} followers / ${input.following} following
    Activity: ${input.postFrequency}
    
    Evaluate based on: Profile completeness, Account age patterns, Username randomness, Network metrics (ratio), and Engagement patterns.`,
    config: {
      systemInstruction: "You are the SocialGuard ML Detection Engine. Act as an ensemble of Logistic Regression, Random Forest, and SVM models. Provide a rigorous security analysis. Categorize the profile as 'fake', 'genuine', or 'suspicious'. Provide 3-4 specific risk factors. Output must be valid JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, enum: ['fake', 'genuine', 'suspicious'] },
          confidenceScore: { type: Type.NUMBER, description: "0 to 100 percentage" },
          category: { type: Type.STRING, enum: ['Bot', 'Impersonator', 'Scammer', 'Genuine User'] },
          verdict: { type: Type.STRING },
          riskFactors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                level: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                description: { type: Type.STRING }
              }
            }
          }
        },
        required: ["status", "confidenceScore", "category", "verdict", "riskFactors"]
      }
    }
  });

  // Extract text from the GenerateContentResponse using the .text getter property.
  // Note: .text is not a method, so do not call text().
  const resultText = response.text;
  if (!resultText) {
    throw new Error("Analysis failed: Model returned an empty response.");
  }

  return JSON.parse(resultText.trim());
};
