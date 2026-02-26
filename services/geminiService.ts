import { GoogleGenAI } from "@google/genai";

const parseJsonResponse = (input: string): { title: string; content: string } | null => {
  const cleaned = input.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
};

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
      return parseJsonResponse(text);
    }
    return null;
  } catch (error) {
    console.error("Error generating blog:", error);
    return null;
  }
};

export const generateBlogContentFromLink = async (url: string): Promise<{ title: string; content: string } | null> => {
  try {
    await ensureApiKey();

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const normalizedUrl = url.trim();
    const readableUrl = `https://r.jina.ai/http://${normalizedUrl.replace(/^https?:\/\//, '')}`;

    const sourceResponse = await fetch(readableUrl);
    if (!sourceResponse.ok) {
      throw new Error(`Could not fetch source content from URL: ${sourceResponse.status}`);
    }

    const sourceText = await sourceResponse.text();
    const excerpt = sourceText.slice(0, 15000);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a polished, first-person blog entry suitable for a sustainability consultant's website based on this source URL and extracted text.

URL: ${normalizedUrl}

SOURCE TEXT:
${excerpt}

Return strict JSON with exactly these keys: "title" and "content".
Make the writing human, thoughtful, and ready to publish.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (text) {
      return parseJsonResponse(text);
    }

    return null;
  } catch (error) {
    console.error("Error generating blog from link:", error);
    return null;
  }
};