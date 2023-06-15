import { TextToSpeech } from "../../../services/voice/voice-service"
import LetterA from '../../../assets/letters/letterA.png'
import LetterB from '../../../assets/letters/letterB.png'
import LetterC from '../../../assets/letters/letterC.png'
import LetterD from '../../../assets/letters/letterD.png'
import LetterE from '../../../assets/letters/letterE.png'
import LetterF from '../../../assets/letters/letterF.png'
import LetterG from '../../../assets/letters/letterG.png'
import LetterH from '../../../assets/letters/letterH.png'
import LetterI from '../../../assets/letters/letterI.png'
import LetterJ from '../../../assets/letters/letterJ.png'
import LetterK from '../../../assets/letters/letterK.png'
import LetterL from '../../../assets/letters/letterL.png'
import LetterM from '../../../assets/letters/letterM.png'
import LetterN from '../../../assets/letters/letterN.png'
import LetterO from '../../../assets/letters/letterO.png'
import LetterP from '../../../assets/letters/letterP.png'
import LetterQ from '../../../assets/letters/letterQ.png'
import LetterR from '../../../assets/letters/letterR.png'
import LetterS from '../../../assets/letters/letterS.png'
import LetterT from '../../../assets/letters/letterT.png'
import LetterU from '../../../assets/letters/letterU.png'
import LetterV from '../../../assets/letters/letterV.png'
import LetterW from '../../../assets/letters/letterW.png'
import LetterX from '../../../assets/letters/letterX.png'
import LetterY from '../../../assets/letters/letterY.png'
import LetterZ from '../../../assets/letters/letterZ.png'

export const alphabeticLetters = [
    {image: LetterA, letter: 'A'},
    {image: LetterB, letter: 'B'},
    {image: LetterC, letter: 'C'},
    {image: LetterD, letter: 'D'},
    {image: LetterE, letter: 'E'},
    {image: LetterF, letter: 'F'},
    {image: LetterG, letter: 'G'},
    {image: LetterH, letter: 'H'},
    {image: LetterI, letter: 'I'},
    {image: LetterJ, letter: 'J'},
    {image: LetterK, letter: 'K'},
    {image: LetterL, letter: 'L'},
    {image: LetterM, letter: 'M'},
    {image: LetterN, letter: 'N'},
    {image: LetterO, letter: 'O'},
    {image: LetterP, letter: 'P'},
    {image: LetterQ, letter: 'Q'},
    {image: LetterR, letter: 'R'},
    {image: LetterS, letter: 'S'},
    {image: LetterT, letter: 'T'},
    {image: LetterU, letter: 'U'},
    {image: LetterV, letter: 'V'},
    {image: LetterW, letter: 'W'},
    {image: LetterX, letter: 'X'},
    {image: LetterY, letter: 'Y'},
    {image: LetterZ, letter: 'Z'}
]

export const speech = (letter: string) => {
    const speech: TextToSpeech = new TextToSpeech();
    speech.textToSpeech(letter);
}