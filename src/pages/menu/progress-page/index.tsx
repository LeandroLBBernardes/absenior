import './styles.scss'

import { UserPerfil } from '../../../components/user-perfil';
import {IoReturnUpBack} from 'react-icons/io5'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressCards } from './progress-card-component';
import { ImVolumeHigh } from 'react-icons/im';
import { WordTable } from './word-table-component';
import { TextToSpeech } from '../../../services/voice/voice-service';

export function ProgressPage() {
  const speech: TextToSpeech = new TextToSpeech();
  const navigate = useNavigate();

  const returnScreen = ():any => {
    return navigate('../../home/menu');
  }

  return(
    <div className='p-5 w-full min-h-screen progress-page'>
      <div className='flex flex-col bg-white rounded-3xl card-progress-page p-6 md:px-5 md:pt-2 md:pb-5 lg:px-10 lg:pt-0 lg:pb-5 h-full'>

      <div className='flex flex-col justify-center items-center gap-3 md:flex-row md:justify-between md:gap-0 md:text-md lg:text-lg pt-8 pb-6'>
        <div className='flex flex-col md:flex-row gap-3 md:gap-5 head-progress items-center'>
          <div className='flex gap-3 items-center'>
            <h1 className='text-2xl lg:text-3xl'>Progresso</h1>
            <span onClick={() => speech.textToSpeech('Progresso')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
          </div>
          <button className='bg-absenior-orange px-2 py-2 rounded-xl text-white flex gap-2 items-center' type='button' onClick={returnScreen}>
            Voltar {React.createElement(IoReturnUpBack, { size: "28"})}
          </button>
        </div>
        <UserPerfil />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-0 h-full w-full'>

        <WordTable />

        <div className='grid place-items-center grid-cols-12 w-full h-full'>
          <ProgressCards />
        </div>
      </div>

      </div>
    </div>
  );
}