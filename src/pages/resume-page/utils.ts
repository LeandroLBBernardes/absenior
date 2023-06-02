import { TextToSpeech } from "../../services/voice/voice-service";

export const textToSpeech = (text: string) => {
  const speech: TextToSpeech = new TextToSpeech();

  speech.textToSpeech(text);
} 