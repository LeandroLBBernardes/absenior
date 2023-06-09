import './styles.scss'
import { FaCoins } from 'react-icons/fa';
import React from 'react';
import { useAuth } from '../../../../hooks/user-auth';
import { useQuery } from 'react-query';
import { getInsigniasCount, getInsigniasDataBaseCount, getUser } from '../../../../services/users-service/users-supabase';
import { MdStars } from 'react-icons/md';

export function AchievementsCards() {
  const { user }: any = useAuth();

  const {data: userData, isLoading: isLoadingUserData} = useQuery("usuarios",() => {
      return getUser(user.id);
  });

  const {data: countIgnias, isLoading: isLoadingCountInsignias} = useQuery("insignias",() => {
      return getInsigniasCount(user.id);
  });

  const {data: countInsigniasDataBase, isLoading: isLoadingCountInsigniasDataBase} = useQuery("totalInsignias",() => {
      return getInsigniasDataBaseCount();
  })

  if(isLoadingUserData || isLoadingCountInsignias || isLoadingCountInsigniasDataBase) {
    return(
      <>
      </>
    );
  }

  console.log(countIgnias);

  const convertNumberToString = (numberToConvert: number | null | undefined): string => {
    if(!numberToConvert)
        return '00';

    return numberToConvert < 10 ? String(numberToConvert).padStart(2,'0') : String(numberToConvert);
  }

  const initialAchievementsCard = [
    {id:0, title: convertNumberToString(userData.pontuacao), text: 'Pontos Conquistados', icon: FaCoins, sizeIcon: '28', colorIcon: "text-[#EC6D41]"},
    {id:1, title: `${convertNumberToString(countIgnias)}/${convertNumberToString(countInsigniasDataBase)}`, text: 'Insignias Liberadas', icon: MdStars, sizeIcon: '28', colorIcon: "text-[#F6C66A]"}
  ];

  return (
    <div className='col-span-12 lg:col-start-3 lg:col-end-11 flex flex-col gap-5 lg:gap-5 justify-center h-full w-full card-achievements-group'>
        {initialAchievementsCard?.map((card, index) => (
            <div className='grid grid-cols-3 card-achievements p-5' key={index}>
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