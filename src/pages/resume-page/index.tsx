import SeniorChair from '../../assets/img-senior-chair.png'
import { ptBr } from '../../config/i18n/generals-pt-br'
import { ImVolumeHigh } from "react-icons/im"
import './styles.scss'
import React from 'react';

export function Resume() {

    return(
        <>
        <div className='flex flex-col gap-5 w-full min-h-screen p-5'>
            <div className='bg-absenior-background flex flex-row md:justify-end'>
                teste
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-12 grid-rows-6 h-full lg:gap-5'>
                <div className='lg:col-span-9 row-span-full grid grid-cols-9 grid-rows-6 gap-5'>
                    <div 
                        className='w-full min-h-full bg-white rounded-3xl card grid grid-cols-1 lg:grid-cols-3 
                                    col-span-full row-span-2 justify-center'>
                        <div 
                            className='col-span-2 flex flex-col p-5 lg:pl-9 justify-center gap-3'>
                            <div className='flex items-center w-full'>
                                <h1>Olá, Sebastião!</h1>
                                <span onClick={() => console.log('teste')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
                            </div>
                            <p>{ptBr.resumePage_TextCard1}</p>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <img className='object-scale-down h-48 w-96 justify-self-center' src={SeniorChair}/>
                        </div>    
                    </div>
                    <div className='bg-absenior-background col-span-full row-span-6'>

                    </div>
                </div>

                <div className='bg-absenior-background lg:col-span-3 row-span-full'>

                </div>
            </div>
        </div>
        </>
    );
}