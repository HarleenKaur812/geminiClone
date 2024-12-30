import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  let result = null; // Define result outside the try block
  try {
    // Start a chat session
    const chatSession = await model.startChat({
      generationConfig,
      history: [],
    });

    // Send the prompt as a message to the chat session
    result = await chatSession.sendMessage(prompt);
    console.log("API Response:", result.response.text());
  } catch (error) {
    console.error("Error in run function:", error);
  }

  // Return result or null if an error occurred
  return result ? await result.response.text() : null;
}

export default run;
