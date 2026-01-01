
// Exported types for the greeting and linguistic components
export type GreetingStyle = "formal" | "casual" | "poetic" | "futuristic" | "historical";

export interface GreetingData {
  originalScript: string;
  translation: string;
  pronunciation: string;
  culturalContext: string;
  visualPrompt: string;
}

export interface ProfileAnalysis {
  status: 'fake' | 'genuine' | 'suspicious';
  confidenceScore: number;
  riskFactors: {
    label: string;
    level: 'low' | 'medium' | 'high';
    description: string;
  }[];
  verdict: string;
  category: 'Bot' | 'Impersonator' | 'Scammer' | 'Genuine User';
}

export interface SystemStats {
  totalScanned: number;
  fakeDetected: number;
  accuracy: string;
  avgResponseTime: string;
}

export interface ProfileInput {
  username: string;
  bio: string;
  followers: number;
  following: number;
  postFrequency: string;
}
