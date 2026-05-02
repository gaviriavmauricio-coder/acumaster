import { GoogleGenerativeAI } from "@google/generative-ai";
import { Challenge } from "../types";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const SYSTEM_INSTRUCTION = `Eres "AcuMaster AI", una inteligencia artificial avanzada experta en Medicina Tradicional China (MTC) que integra la Bioenergética de A. Carlos Nogueira Pérez y la Psiconeuroacupuntura (PNA) de Juan Pablo Moltó.

Tu conocimiento se basa íntegramente en los libros de texto proporcionados:
1. "ACUPUNTURA I: Fundamentos de Bioenergética" - A. Carlos Nogueira Pérez.
2. "GUÍA DE ACUPUNTURA PSIQUIÁTRICA" - Juan Pablo Moltó (Psiconeuroacupuntura).

CONCEPTOS CLAVE A INTEGRAR:
- BIOENERGÉTICA: El T'CHI como impulso motor (el 1 que genera el 2), la materia como condensación de energía. La trilogía Rong (Nutricia), Wei (Defensiva) y Zong (Ancestral). Los procesos de purificación del alimento en los 3 Recalentadores. Planos Energéticos (Bisagras).
- PNA: El sistema de RED (cibernética), las 3 Fórmulas (Primaria/Sueño, Secundaria/Patrón, Terciaria/Shen), los 7 centros del Shen (Anillos de Reich/Chakras), las 5 Capas de descarga emocional y la liberación de la coraza muscular.

REGLAS DE ORO:
1. EXHAUSTIVIDAD: El usuario siente que las respuestas son incompletas. Debes proveer explicaciones EXTENSAS, detalladas y pedagógicas. Explica el "porqué" de cada punto o síndrome basándote en la fisiopatología energética.
2. PRECISIÓN TÉCNICA: Usa terminología de los autores (ej. "Lorazepam de la MTC" para 17RM, "Antena de captación" para puntos dominantes). Menciona planos energéticos y centros del Shen.
3. LIMPIEZA VISUAL: NO uses asteriscos (*) ni formato markdown (negritas/cursivas). Mantén el texto limpio y legible para que sea visualmente profesional.
4. IDIOMA: Responde siempre en español.`;

function cleanJson(text: string): string {
  if (!text) return "";
  let cleaned = text.replace(/```json\n?|```/g, "").trim();
  const startIdx = cleaned.search(/[\{\[]/);
  if (startIdx === -1) return cleaned;
  cleaned = cleaned.substring(startIdx);
  const endIdx = cleaned.lastIndexOf('}');
  const endBracketIdx = cleaned.lastIndexOf(']');
  const finalIdx = Math.max(endIdx, endBracketIdx);
  if (finalIdx === -1) return cleaned;
  return cleaned.substring(0, finalIdx + 1);
}

const extractText = (response: any): string => {
  if (typeof response === "string") return response;
  if (typeof response?.text === "string") return response.text;
  if (typeof response?.text === "function") return response.text();
  if (response?.candidates?.[0]?.content?.parts?.[0]?.text) return response.candidates[0].content.parts[0].text;
  const textPart = response?.candidates?.[0]?.content?.parts?.find((p: any) => p.text);
  if (textPart) return textPart.text;
  return "";
};

export async function generateChallenge(level: number, topic?: string): Promise<Challenge[]> {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{ text: `Genera una serie de 10 desafíos interactivos (JSON) para un estudiante de MTC y PNA. Contexto: Nivel ${level} ${topic ? `sobre el tema "${topic}"` : ""}. Incluye casos clínicos complejos con síntomas, lengua y pulso.` }]
      }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    const text = extractText(result);
    const cleaned = cleanJson(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error generating challenge:", error);
    return [];
  }
}

export async function evaluateAnswer(question: string, answer: string, correctAnswer: string): Promise<{ isCorrect: boolean; feedback: string }> {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{ text: `Evalúa con sabiduría de MTC y PNA: Pregunta: ${question}. Respuesta alumno: ${answer}. Respuesta correcta: ${correctAnswer}. Devuelve JSON con 'isCorrect' y 'feedback' (explicación energética profunda y completa).` }]
      }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    const text = extractText(result);
    const cleaned = cleanJson(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return { isCorrect: answer === correctAnswer, feedback: "La conexión con el Tao se ha interrumpido, pero tu intención es pura." };
  }
}

export async function getChatResponse(history: any[], message: string): Promise<string> {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\nResponde de forma completa, pedagógica y extensa. No escatimes en sabiduría clásica. Evita el uso de asteriscos o markdown.",
      }
    });

    return extractText(result) || "No he podido conectar con el Oráculo en este momento.";
  } catch (error) {
    console.error("Error in chat response:", error);
    return "El flujo de Qi se ha interrumpido. Inténtalo de nuevo.";
  }
}


