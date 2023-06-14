import React from 'react';
import './styles.scss'
import { ICardMenuComponent } from '../../../../interfaces/card-menu-props.interface';
import { ImVolumeHigh } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { TextToSpeech } from '../../../../services/voice/voice-service';

export function CardMenuComponent(props: ICardMenuComponent) {
  const navigate = useNavigate();
  const speech: TextToSpeech = new TextToSpeech();

  let list: Array<number> = [];

  const navigateTo = (path: string, externalLink?: boolean): any => {
    if(list.length == 0) {
      if(externalLink != undefined && externalLink == true) {
        window.open("https://www.youtube.com/@Professora_Maria_Izabel", "_blank");
        return null;
      }
  
      return navigate(path);
    }

    list = [];    
  }

  const textToSpeech = (text: string) => {
    list.push(1);
    speech.textToSpeech(text);
  }

  return(
    <div className='col-span-1 lg:row-span-3 rounded-2xl card-menu-button mt-8 md:mt-0'
         style={{background: `${props.color}`}}
         onClick={() => {navigateTo(props.link, props.externalLink)}}
    >
      <div className='grid grid-flow-row-dense h-full'>
        <div className='flex flex-col w-full items-center justify-center h-full shadow-md cabecalho-card'>
          <img className="w-44 lg:w-40 2xl:w-72" src={props.image} />
        </div>
        <div className='flex flex-col justify-center card-menu-footer h-full py-6 md:py-3 lg:py-0 w-full'>
          <div className='flex flex-row justify-around gap-2 w-full'>
            <span className='invisible'>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
            <h1 className='text-xl 2xl:text-2xl'>{props.description}</h1>
            <span onClick={() => {textToSpeech(props.description)}}>{React.createElement(ImVolumeHigh)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}