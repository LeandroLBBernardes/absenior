import './styles.scss'
import { HeaderMenuPageComponent } from '../../../components/header-menu-pages';
import { alphabeticLetters, speech } from './utils';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export function PraticePage() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [letra, setLetra] = useState(alphabeticLetters[index]);
    const [isfirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);

    useEffect(() => {
        if(index == 0) {
            setIsFirst(true);
            setIsLast(false);
        }else if(index == alphabeticLetters.length-1) {
            setIsFirst(false);
            setIsLast(true);
        }else {
            setIsFirst(false);
            setIsLast(false);
        }
    },[index]);

    const setArrow = () => {
        setTimeout(() => {
            setOpen(!open);
        }, 100);
    }

    const changeLetter = (letter: any) => {
        speech(`Letra: ${letter.letter}`);
        setLetra(letter);
        setIndex(alphabeticLetters.indexOf(letter));
    }

    const nextLetter = () => {
        if(index < alphabeticLetters.length-1) {
            setIndex(index+1);
        }
    }

    const previousLetter = () => {
        if(index > 0) {
            setIndex(index-1);
        }
    }


    return(
        <div className='min-h-screen w-full p-5'>
            <div className='bg-white w-full h-full rounded-3xl practice-card flex flex-col md:px-5 lg:px-10 lg:pt-0'>
                <HeaderMenuPageComponent 
                    title="É hora de praticar!"
                    complement='Escreva em seu caderno a letra abaixo:'
                />
                <div className='hidden lg:flex lg:text-2xl'>
                    Escreva em seu caderno a letra abaixo:
                </div>
                <div className='flex flex-col h-full'>
                    <div className='h-full w-full flex justify-center items-center'>
                        <img className={`object-scale-down ${open ? "md:h-48" : "md:h-32"} lg:h-72 2xl:h-96 md:duration-500`} src={letra.image} />
                    </div>
                    <div className={`hidden ${open ? "md:hidden" : "md:flex"} lg:flex justify-around w-full py-5`}>
                        {alphabeticLetters.map((letter, index) => (
                            <div key={index} className='letters' onClick={() => changeLetter(letter)}>
                                {letter.letter}
                            </div>
                        ))}
                    </div>
                    <div className='break-line-letter'></div>
                </div>
                
                <div className='flex flex-row justify-between'>
                    <button className='hidden md:flex md:flex-col md:justify-center md:items-center lg:hidden md:p-3 md:text-2xl'
                    onClick={setArrow}>
                        {open ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    <div className='p-5 md:p-3 lg:py-5 flex flex-row justify-around md:justify-end md:gap-5 lg:justify-between w-full'>
                        <button className={`absenior-button footer-button-practice ${isfirst && 'disable'}`} onClick={previousLetter}>Letra Anterior</button>
                        <button className={`absenior-button footer-button-practice ${isLast && 'disable'}`} onClick={nextLetter}>Próxima Letra</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}