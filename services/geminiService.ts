import { GoogleGenAI } from "@google/genai";

// Helper to handle the mandatory API key selection for premium models like gemini-3-pro-image-preview
export const ensureApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      if (window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
        // Assume success after dialog interaction per instructions
        return true;
      }
      return false;
    }
    return true;
  }
  return true; // Fallback for environments where window.aistudio might not be defined (though it should be)
};

export const generatePaintedImage = async (topic: string): Promise<string | null> => {
  try {
    await ensureApiKey();
    
    // Create instance fresh to pick up the selected key
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `A cute, artistic painted image of ${topic}. The style should be expressive, like an oil painting or watercolor, suitable for a sustainability consultant's personal brand. Soft earthy tones, nature-inspired. High quality.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview', // Mapped from "Nanobana Pro" / "nano banana pro"
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    // If we get a "Requested entity was not found" or similar auth error, we might need to reset/prompt key
    // For now, return null to handle in UI
    return null;
  }
};

export const generateBlogContent = async (topic: string): Promise<{ title: string; content: string } | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using Flash for text generation speed
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, engaging blog post for a sustainability consultant about: ${topic}. Return JSON with "title" and "content" fields. Keep it professional but personal.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error generating blog:", error);
    return null;
  }
};