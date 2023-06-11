import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './styles.scss'
import { CardActivity } from '../cards-activity';
import { useState, useEffect } from 'react';

export function ActivityCarousel({cardListPros}: any) {
    const initialCardList = cardListPros as Array<any>; 

    const returnInitialCard = () => {
        if(window.innerWidth > 1024) {
            return initialCardList.filter((card) => card.id < 4);
        }else if(window.innerWidth > 768 && window.innerWidth < 1024) {
            return initialCardList.filter((card) => card.id < 3);
        }else if(window.innerWidth < 768) {
            return initialCardList.filter((card) => card.id == 1);
        }
    }

    const [count,setCount] = useState(0);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);
    const [cardList, setCardList] = useState(returnInitialCard() as Array<any>);

    useEffect(() => {
        if(window.innerWidth > 1024) {
            if(count == 0) {
                setCardList(initialCardList.filter((card) => card.id < 4));
                setLast(false);
                setFirst(true);
            }else if(count == 1) {
                setCardList(initialCardList.filter((card) => card.id > 3));
                setLast(true);
                setFirst(false);
            }
        }else if(window.innerWidth > 768 && window.innerWidth < 1024) {
            if(count == 0) {
                setCardList(initialCardList.filter((card) => card.id < 3));
                setLast(false);
                setFirst(true);
            }else if(count == 1) {
                setCardList(initialCardList.filter((card) => card.id > 2 && card.id < 5));
                setLast(false);
                setFirst(false);
            }else if(count == 2) {
                setCardList(initialCardList.filter((card) => card.id > 4));
                setLast(true);
                setFirst(false);
            }
        }else if(window.innerWidth < 768) {
            setCardList(initialCardList.filter((card) => card.id == count+1));
            if(count == 0){
                setLast(false);
                setFirst(true);
            }else if(count == 5) {
                setLast(true);
                setFirst(false);
            }
        }
    },[count]);

    const incrementCount = () => {
        if(window.innerWidth > 1024 && count < 1) {
            setCount(count+1);
        }else if((window.innerWidth > 768 && window.innerWidth < 1024) && count < 2) {
            setCount(count+1);
        }else if(window.innerWidth < 768 && count < 5) {
            setCount(count+1);
        }
    }

    const decrementCount = () => {
        if(count > 0) {
            setCount(count-1);
        }
    }

    window.addEventListener('resize', () => {
        setCount(0);
        setCardList(returnInitialCard() as Array<any>);
    });

    return(
        <div className='flex w-full activity-carousel'>
            <div className='flex flex-col justify-center items-center md:pr-3 lg:px-5'>
                <div className={`arrow-button ${first && 'disable'}`} onClick={decrementCount}>
                    <FiChevronLeft size={32}/>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-full w-full pt-3'>
                {cardList.map((card,index) => (
                    <CardActivity
                        key={index} 
                        title={card.title}
                        subTitle={card.subTitle}
                        imagem={card.imagem}
                        link={card.link}
                    />
                ))}
            </div>
            <div className='flex flex-col justify-center items-center md:pl-3 lg:px-5'>
                <div className={`arrow-button ${last && 'disable'}`} onClick={incrementCount}>
                    <FiChevronRight size={32}/>
                </div>
            </div>
        </div>
    );
}