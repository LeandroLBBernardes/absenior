import React, { useEffect, useState } from 'react';
import './styles.scss'
import { ImVolumeHigh } from 'react-icons/im';
import { useAuth } from '../../../../hooks/user-auth';
import { useQuery } from 'react-query';
import { getUserInsignias } from '../../../../services/users-service/users-supabase';
import { TextToSpeech } from '../../../../services/voice/voice-service';
import { LoadingAnimation } from '../../../../components/loading-animation';
import { ptBr } from '../../../../config/i18n/generals-pt-br';

export function InsigniasTable() {
  const speech: TextToSpeech = new TextToSpeech();

  const resizeScreen = (): number => {
    if(window.innerWidth > 1536)
      return window.innerHeight*0.7;

    if(window.innerWidth > 1280)
      return window.innerHeight*0.57;

    return window.innerHeight*0.5;
  }

  const { user }: any = useAuth();
  const [heightScreen, setHeightScreen] = useState(resizeScreen());
  const [insignias,setInsignias] = useState([] as Array<any>);

  const { status, data, isLoading }:any = useQuery("insignias_card",() => {
    return getUserInsignias(user.id);
  });

  useEffect(() => {
    if(status === 'success') {
        let auxArray: Array<any> = [];

        if(data){
          for(let i = 0; i < data.length; i++) {
            auxArray.push(data[i].insignias);
          }
  
          setInsignias(auxArray);
          auxArray = [];
        }
    }
  },[status,data]);

  if(isLoading) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div style={{width: '120px'}}>
          <LoadingAnimation />
        </div>
      </div>
    );
  }
  
  window.addEventListener('resize', () => {
    setHeightScreen(resizeScreen());
  });

  return(
    <div className='lg:pt-10 achievements-table w-full flex flex-col gap-6'>
          <div className='flex flex-col justify-between lg:items-center lg:flex-row w-full'>
            <div className='flex gap-3 items-center'>
              <h1 className='md:text-xl lg:2xl'>{ptBr.achievementsPage_title}</h1>
              <span onClick={() => speech.textToSpeech(ptBr.achievementsPage_title)}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
            </div>
          </div>

          <div className={`w-full overflow-y-auto`} style={{height: `${heightScreen}px`}}>
            <table className="table-auto w-full">
              <tbody>
                {insignias?.map((insignia: any, index: number) => (
                  <tr className='table-row' key={index}>
                    <td className=''><img className="h-14" src={insignia.imagem} /></td>
                    <td className=''>{insignia.descricao}
                      <p className='hidden md:flex'>{insignia.elogio} Alcançou {insignia.pontuacao} pontos</p>
                    </td>
                    <td className=''>
                      <span onClick={() => speech.textToSpeech(`${insignia.descricao}, ${insignia.elogio} Alcançou ${insignia.pontuacao} pontos`)}>
                        {React.createElement(ImVolumeHigh, { size: "28"})}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
  );
}