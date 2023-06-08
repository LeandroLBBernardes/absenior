import React from 'react';
import { TextToSpeech } from '../../services/voice/voice-service';
import './styles.scss'
import { ImVolumeHigh } from 'react-icons/im';
import { IoReturnUpBack } from 'react-icons/io5';
import { UserPerfil } from '../user-perfil';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
    title: string;
}

export function HeaderMenuPageComponent(props: HeaderProps) {
    const speech: TextToSpeech = new TextToSpeech();
    const navigate = useNavigate();

    const returnScreen = ():any => {
        return navigate('../../home/menu');
    }

    return(
        <div className='flex flex-col justify-center items-center gap-3 md:flex-row md:justify-between md:gap-0 md:text-md lg:text-lg pt-8 pb-6'>
            <div className='flex flex-col md:flex-row gap-3 md:gap-5 head-achievements items-center'>
            <div className='flex gap-3 items-center'>
                <h1 className='text-2xl lg:text-3xl'>{props.title}</h1>
                <span onClick={() => speech.textToSpeech('Conquistas')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
            </div>
            <button className='bg-absenior-orange px-2 py-2 rounded-xl text-white flex gap-2 items-center' type='button' onClick={returnScreen}>
                Voltar {React.createElement(IoReturnUpBack, { size: "28"})}
            </button>
            </div>
            <UserPerfil />
        </div>
    );
}