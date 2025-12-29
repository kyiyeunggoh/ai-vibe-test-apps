
import { GoogleGenAI, Type } from "@google/genai";
import { UserBlueprint, UserVibe, Exercise, BodyFocus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateWorkout(
  blueprint: UserBlueprint,
  vibe: UserVibe,
  equipment: string[],
  focus: BodyFocus
): Promise<Exercise[]> {
  const prompt = `
    Generate a personalized workout session for JimBro.
    
    User Profile:
    - Age: ${blueprint.age}, Gender: ${blueprint.gender}
    - Goal: ${blueprint.goal}
    - Session Time: ${blueprint.availability.minsPerSession} minutes
    - Max Exercises: ${blueprint.maxExercises}
    - Injuries: ${blueprint.injuries.join(', ') || 'None'}
    - Vibe: ${vibe}
    - Focus Area: ${focus}
    - Available Equipment: ${equipment.join(', ')}

    YOUTUBE LINK RELIABILITY RULES:
    1. Provide a 'youtubeUrl' that links to a standard, high-quality form tutorial.
    2. MANDATORY: ONLY use links from extremely popular, long-standing fitness channels (e.g., Athlean-X, Jeff Nippard, Squat University, or Bodybuilding.com) as these are least likely to be deleted or private.
    3. Ensure the 'thumbnailUrl' is a valid image URL representing the exercise clearly.
    4. Avoid obscure or recently uploaded videos that might have broken links.

    Safety & Structure:
    - If "Knee" is an injury, avoid high-impact jumping; use step-outs or low-impact moves.
    - If "Lower Back" is an injury, avoid heavy spinal loading.
    - Start with a 3-minute Warm-up and end with a 3-minute Cool-down.
    - Total exercises (including warm-up/cool-down) <= ${blueprint.maxExercises}.
    - Ensure exercises target the focus area: ${focus}.
    - Adjust intensity based on vibe: LOW is gentle, STEADY is moderate, STRONG is high intensity.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            reps: { type: Type.STRING },
            sets: { type: Type.NUMBER },
            suggestedWeight: { type: Type.STRING },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            thumbnailUrl: { type: Type.STRING, description: 'URL to a high-quality exercise image' },
            youtubeUrl: { type: Type.STRING, description: 'Direct URL to a stable YouTube instructional video' },
            category: { type: Type.STRING, enum: ['Warm-up', 'Main', 'Cool-down'] }
          },
          required: ['id', 'name', 'reps', 'sets', 'tips', 'category', 'thumbnailUrl', 'youtubeUrl']
        }
      }
    }
  });

  return JSON.parse(response.text);
}

export async function scanRoomForEquipment(base64Image: string): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: "List common household fitness equipment or items found in this room that can be used for exercise. Return as a simple JSON array of strings." }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  
  return JSON.parse(response.text);
}
