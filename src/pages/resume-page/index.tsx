import './styles.scss'
import React, { useState } from 'react';

import SeniorChair from '../../assets/img-senior-chair.png'

import { ptBr } from '../../config/i18n/generals-pt-br'
import { UserPerfil } from '../../components/user-perfil'

import { ImVolumeHigh } from "react-icons/im"
import { FaCoins } from "react-icons/fa"
import { MdStars } from "react-icons/md"
import { CgLoadbarSound } from "react-icons/cg"


export function Resume() {
    
    const initialDifficultyButtons = [
        {id: 0, level: 1, description: "Fácil", isDisable: false},
        {id: 1, level: 2, description: "Médio", isDisable: true},
        {id: 2, level: 3, description: "Difícil", isDisable: true}
    ];

    const initialPerformanceCard = [
        {id:0, title: '16', text: 'Pontos Conquistados', icon: FaCoins, sizeIcon: '28', colorIcon: "text-[#EC6D41]"},
        {id:0, title: '01/40', text: 'Broches Liberados', icon: MdStars, sizeIcon: '28', colorIcon: "text-[#F6C66A]"},
        {id:0, title: '04', text: 'Palavras Aprendidas', icon: CgLoadbarSound, sizeIcon: '40', colorIcon: "text-[#508E92]"}
    ]

    const [difficultyButtons, setDifficultyButtons] = useState(initialDifficultyButtons);

    const setDifficulty = (index: number): any => {
        const nextDifficultyButtons = difficultyButtons.map((button, idButton) => {
            let isDisable: boolean = false;

            if(idButton != index)
                isDisable = true;
            
            return {
                id: button.id,
                level: button.level,
                description: button.description,
                isDisable: isDisable
            }
        });

        setDifficultyButtons(nextDifficultyButtons);
    }

    return(
        <>
        <div className='flex flex-col gap-2 w-full min-h-screen px-5 pb-5 pt-5 md:pt-2 mb-5 lg:mb-0'>
            <div className='flex flex-row md:justify-end'>
                <UserPerfil />
            </div>
            
            <div className='grid grid-cols-1 lg:grid-cols-12 grid-rows-6 h-full lg:gap-5'>
                <div className='lg:col-span-9 row-span-full grid grid-cols-9 grid-flow-row gap-5'>
                    <div 
                        className='w-full min-h-full bg-white rounded-3xl card-resume grid grid-cols-1 lg:grid-cols-3 
                                    col-span-full row-auto justify-center'>
                        <div 
                            className='col-span-2 flex flex-col p-5 lg:pl-9 justify-center gap-2 2xl:gap-3'>
                            <div className='flex items-center w-full'>
                                <h1>Olá, Sebastião!</h1>
                                <span onClick={() => console.log('teste')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
                            </div>
                            <p>{ptBr.resumePage_TextCard1}</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <img className='object-scale-down h-48 w-96 justify-self-center' src={SeniorChair}/>
                        </div>    
                    </div>
                    <div 
                        className='w-full min-h-full bg-white rounded-3xl card-resume grid grid-cols-1 lg:grid-cols-3 
                                   col-span-full row-auto 2xl:row-span-4 justify-center 2xl:pt-10'>
                        <div 
                            className='col-span-full flex flex-col p-5 lg:px-9 gap-10 md:gap-8 2xl:gap-20'>
                            <div className='grid gap-2 2xl:gap-3'>    
                                <div className='flex items-center w-full'>
                                    <h1>Nível de dificuldade</h1>
                                    <span onClick={() => console.log('teste')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
                                </div>
                                <p>{ptBr.resumePage_TextCard2}</p>
                            </div>
                            
                            <div className='resume-buttons grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 h-full'>
                                {difficultyButtons?.map((button,index) => (
                                    <div className='flex flex-col text-center gap-3' key={index}>
                                        <button className={`${button.isDisable && 'opacity-60'} h-full`} onClick={() => setDifficulty(index)}>
                                            {button.level}
                                        </button>
                                        <span className={`${button.isDisable && 'opacity-60'}`}>{button.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div> 
                    </div>
                </div>

                <div className='w-full min-h-full bg-white rounded-3xl card-resume col-span-12 lg:col-span-5 2xl:col-span-3 
                                lg:row-span-full mt-5 lg:mt-0 p-5 flex flex-col gap-5 lg:gap-0 2xl:gap-16'>
                    <div className='flex items-center w-full'>
                        <h1>Desempenho</h1>
                        <span onClick={() => console.log('teste')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
                    </div>
                    <div className='flex flex-col gap-5 justify-center 2xl:justify-start h-full'>
                        {initialPerformanceCard?.map((card, index) => (
                            <div className='grid grid-cols-3 card-performance p-5' key={index}>
                                <div className={`col-span-1 flex flex-col justify-center items-center ${card.colorIcon}`}>
                                    {React.createElement(card.icon, { size: `${card.sizeIcon}`})}
                                </div>
                                <div className='col-span-2'>
                                    <h1>{card.title}</h1>
                                    <p>{card.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}