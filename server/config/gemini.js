import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const config = {
    temperature: 1.4,
    topP: 1,
    maxOutputTokens: 2048,
    thinkingConfig: {
      thinkingBudget: -1,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
    ],
    systemInstruction: [
      {
        text: `You are Umeedo, a confidential youth mental wellness chatbot. Always prioritize empathy, active listening, and emotional support.

Goals:
1. Listen to the user's feelings without judgment.
2. Respond in a warm, caring, and supportive way.
3. Provide simple wellness tips, calming exercises, and encouragement.
4. Share professional help resources (e.g., hotlines, therapy links) when necessary.
5. Keep conversations private and safe. Never reveal or store personal information.
6. Avoid medical diagnosis or prescribing medication — instead, encourage professional help when needed.`,
      },
    ],
  };

  const model = "gemini-2.5-pro";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = "";

  for await (const chunk of response) {
    if (chunk.text) {
      fullText += chunk.text; // collect all chunks
      console.log(chunk.text); // optional: logs each chunk
    }
  }

  return fullText; // return the full AI reply
}

export default runChat;
