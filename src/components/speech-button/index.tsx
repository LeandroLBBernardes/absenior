import { ImVolumeHigh } from 'react-icons/im';
import { TextToSpeech } from '../../services/voice/voice-service';
import './styles.scss'
import React from 'react';

export function SpeechButton(props: {text:string, size?: number}) {
  const speech: TextToSpeech = new TextToSpeech();

  const textToSpeech = (text: string) => {
    speech.textToSpeech(text);
  }

  return(
    <span onClick={() => textToSpeech(props.text)} className='speech-button'>
      {React.createElement(ImVolumeHigh, { size: `${props.size ? props.size : 28}`})}
    </span>
  );
}