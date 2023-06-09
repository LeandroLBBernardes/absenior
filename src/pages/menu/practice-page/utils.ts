import { TextToSpeech } from "../../../services/voice/voice-service"
import ImageInstruction from '../../../assets/instructionA.png'

export const alphabeticLetters = [
    {image: ImageInstruction, letter: 'A'},
    {image: ImageInstruction, letter: 'B'},
    {image: ImageInstruction, letter: 'C'},
    {image: ImageInstruction, letter: 'D'},
    {image: ImageInstruction, letter: 'E'},
    {image: ImageInstruction, letter: 'F'},
    {image: ImageInstruction, letter: 'G'},
    {image: ImageInstruction, letter: 'H'},
    {image: ImageInstruction, letter: 'I'},
    {image: ImageInstruction, letter: 'J'},
    {image: ImageInstruction, letter: 'K'},
    {image: ImageInstruction, letter: 'L'},
    {image: ImageInstruction, letter: 'M'},
    {image: ImageInstruction, letter: 'N'},
    {image: ImageInstruction, letter: 'O'},
    {image: ImageInstruction, letter: 'P'},
    {image: ImageInstruction, letter: 'Q'},
    {image: ImageInstruction, letter: 'R'},
    {image: ImageInstruction, letter: 'S'},
    {image: ImageInstruction, letter: 'T'},
    {image: ImageInstruction, letter: 'U'},
    {image: ImageInstruction, letter: 'V'},
    {image: ImageInstruction, letter: 'W'},
    {image: ImageInstruction, letter: 'X'},
    {image: ImageInstruction, letter: 'Y'},
    {image: ImageInstruction, letter: 'Z'}
]

export const speech = (letter: string) => {
    const speech: TextToSpeech = new TextToSpeech();
    speech.textToSpeech(letter);
}