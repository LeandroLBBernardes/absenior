import React from 'react';
import './styles.scss'
import { ImVolumeHigh } from 'react-icons/im';
import { IoReturnUpBack } from 'react-icons/io5';
import { UserPerfil } from '../../../components/user-perfil';
import { TextToSpeech } from '../../../services/voice/voice-service';
import { useNavigate } from 'react-router-dom';
import { ActivityCarousel } from './carousel-cards';

import AtividadeSilabas from '../../../assets/atividade_6.png'
import AtividadeFrases from '../../../assets/atividade_5.png'
import AtividadePalavras from '../../../assets/atividade_4.png'
import AtividadeFrasesPalavras from '../../../assets/atividade_3.png'
import AtividadeImagens from '../../../assets/atividade_2.png'
import AtividadeAssociacao from '../../../assets/atividade_1.png'

export function ActivityPage() {
    const speech: TextToSpeech = new TextToSpeech();
    const navigate = useNavigate();

    const returnScreen = () => {
        return navigate('../../home/menu');
    }

    const cardList = [
        {id: 1, title: 'Complete sílabas', subTitle: 'Selecione as sílabas para formar a palavra.', imagem: AtividadeSilabas, link: 'formsyllables'},
        {id: 2, title: 'Forme palavras', subTitle: 'Selecione as letras para formar a palavra.', imagem: AtividadePalavras, link: 'formwords'},
        {id: 3, title: 'Complete a frase', subTitle: 'Selecione a palavra que complete a frase', imagem: AtividadeFrases, link: '../../../construction'},
        {id: 4, title: 'Forme frases', subTitle: 'Selecione as palavras para formar a frase.', imagem: AtividadeFrasesPalavras, link: 'formphrases'},
        {id: 5, title: 'Ligue Imagem', subTitle: 'Selecione a imagem e a palavra correspondente.', imagem: AtividadeImagens, link: 'linkimage'},
        {id: 6, title: 'Jogo da associação', subTitle: 'Selecione a palavra que representa a imagem.', imagem: AtividadeAssociacao, link: 'association'}
    ];

    return(
        <div className='p-5 w-full activity-page'>
            <div className='flex flex-col bg-white rounded-3xl card-activity-page p-6 md:px-5 md:pt-2 md:pb-5 lg:px-0 lg:pt-0 lg:pb-5 gap-20 md:gap-0 2xl:gap-10'>

                <div className='flex flex-col justify-center items-center gap-3 md:flex-row md:justify-between md:gap-0 md:text-md lg:text-lg pt-8 pb-6 lg:px-10'>
                    <div className='flex flex-col md:flex-row gap-3 md:gap-3 head-activity items-center'>
                        <div className='flex gap-3 items-center'>
                            <h1 className='text-2xl lg:text-3xl'>Atividades</h1>
                            <span onClick={() => speech.textToSpeech('Atividades')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
                        </div>
                        <button className='bg-absenior-orange px-2 py-2 rounded-xl text-white flex gap-2 items-center' type='button' onClick={returnScreen}>
                            Voltar {React.createElement(IoReturnUpBack, { size: "28"})}
                        </button>
                    </div>
                    <UserPerfil />
                </div>

                <ActivityCarousel cardListPros={cardList} />

            </div>
        </div>
    );
}