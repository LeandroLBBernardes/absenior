import React from 'react';
import { TextToSpeech } from '../../../../services/voice/voice-service';
import './styles.scss'
import { ImVolumeHigh } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/user-auth';
import { useQuery } from 'react-query';
import { getUser } from '../../../../services/users-service/users-supabase';
import { LoadingAnimation } from '../../../../components/loading-animation';

type CardProps = {
    title: string;
    subTitle: string;
    imagem: any;
    link?: string;
}

export function CardActivity(props: CardProps) {
    const { user }: any = useAuth();

    const speech: TextToSpeech = new TextToSpeech();
    const navigate = useNavigate();

    const {data,isLoading} = useQuery("level-atividades",() => {
        return getUser(user.id);
    })

    if(isLoading) {
        return (
            <div className='rounded-xl flex flex-col justify-center items-center px-5 pt-6 pb-3 min-h-full text-center'>
                <div>
                    <LoadingAnimation />
                    <h1 className='text-2xl'>Carregando...</h1>
                </div>
            </div>
        )
    }

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
        <div className='activity-card rounded-xl px-5 pt-6 pb-3' onClick={() => navigateTo(props.link ? props.link : '/')}>
            <div className='flex flex-col gap-3 2xl:gap-8 w-full h-full '>
                <div className='flex justify-start items-center'>
                    <span className='level-button rounded-full'>Nível {data.nivel}</span>
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