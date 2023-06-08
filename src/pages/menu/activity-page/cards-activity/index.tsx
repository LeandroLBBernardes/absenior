import React from 'react';
import { TextToSpeech } from '../../../../services/voice/voice-service';
import './styles.scss'
import { ImVolumeHigh } from 'react-icons/im';
import useUserLevel from '../../../../hooks/zustand/user-level';
import { useNavigate } from 'react-router-dom';

type CardProps = {
    title: string;
    subTitle: string;
    imagem: any;
}

export function CardActivity(props: CardProps) {
    const speech: TextToSpeech = new TextToSpeech();
    const userLevel = useUserLevel(state => state.userLevel);
    const navigate = useNavigate();

    let list: Array<number> = [];

    const navigateTo = (path: string): any => {
        if(list.length == 0) {
            return navigate(path);
        }

        list = [];    
    }

    const textToSpeech = (text: string) => {
        list.push(1);
        speech.textToSpeech(text);
    }

    return(
        <div className='activity-card rounded-xl px-5 pt-6 pb-3' onClick={() => navigateTo('/')}>
            <div className='flex flex-col gap-3 2xl:gap-8 w-full h-full '>
                    <div className='flex justify-start items-center'>
                        <span className='level-button rounded-full'>Nível {userLevel}</span>
                    </div>
                    <div className='flex justify-start items-center gap-3 card-activty-title'>
                        <h1 className='text-2xl 2xl:text-4xl'>{props.title}</h1>
                        <span onClick={() => textToSpeech(props.title+props.subTitle)}>
                            {React.createElement(ImVolumeHigh, { size: "28"})}
                        </span>
                    </div>
                    <p className='text-md 2xl:text-lg'>{props.subTitle}</p>
                    <div className='h-full w-full flex flex-col items-end justify-end'>
                        <img className='object-cover w-full' src={props.imagem}/>
                    </div>
            </div>
        </div>
    );
}