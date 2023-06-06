import './styles.scss'
import { FaCoins } from 'react-icons/fa';
import { CgLoadbarSound } from 'react-icons/cg';
import React from 'react';
import { useAuth } from '../../../../hooks/user-auth';
import { useQuery } from 'react-query';
import { getUser, getWordCount } from '../../../../services/users-service/users-supabase';

export function ProgressCards() {
  const { user }: any = useAuth();

  const {data: userData, isLoading: isLoadingUserData} = useQuery("usuarios",() => {
      return getUser(user.id);
  });

  const {data: countWord, isLoading: isLoadingCountWord} = useQuery("contar-palavras",() => {
      return getWordCount(user.id);
  });

  if(isLoadingUserData || isLoadingCountWord) {
    return(
      <>
      </>
    );
  }

  const convertNumberToString = (numberToConvert: number | null | undefined): string => {
    if(!numberToConvert)
        return '00';

    return numberToConvert < 10 ? String(numberToConvert).padStart(2,'0') : String(numberToConvert);
  }

  const initialPerformanceCard = [
    {id:0, title: convertNumberToString(userData.pontuacao), text: 'Pontos Conquistados', icon: FaCoins, sizeIcon: '28', colorIcon: "text-[#EC6D41]"},
    {id:0, title: convertNumberToString(countWord), text: 'Palavras Aprendidas', icon: CgLoadbarSound, sizeIcon: '40', colorIcon: "text-[#508E92]"}
  ];

  return (
    <div className='col-span-12 lg:col-start-3 lg:col-end-11 flex flex-col gap-5 lg:gap-5 justify-center h-full w-full card-performance-group'>
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
  );
}