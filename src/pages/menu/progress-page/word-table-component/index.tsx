import React, { useEffect, useState } from 'react';
import './styles.scss'
import { ImVolumeHigh } from 'react-icons/im';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../../../hooks/user-auth';
import { useQuery } from 'react-query';
import { getUserWords } from '../../../../services/users-service/users-supabase';
import { TextToSpeech } from '../../../../services/voice/voice-service';
import { LoadingAnimation } from '../../../../components/loading-animation';

export function WordTable() {
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
  const [words,setWords] = useState([] as Array<any>);
  const [searchWords,setSearchWords] = useState([] as Array<any>);
  const [search,setSearch] = useState('');

  let searchArray: Array<any> = [];

  const { status, data, isLoading }:any = useQuery("palavras",() => {
    return getUserWords(user.id);
  })

  useEffect(() => {
    if(status === 'success') {
        let auxArray: Array<any> = [];

        if(data){
          for(let i = 0; i < data.length; i++) {
            auxArray.push(data[i].palavras);
          }
  
          setWords(auxArray);
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

  const handleChange = (event: any) => {
    const result: any = words.filter(x => x.descricao.includes(event.target.value));
    searchArray = result;
      
    setSearch(event.target.value);
    setSearchWords(result ? searchArray : [] as Array<any>);

    if(event.target.value == '') {
      setSearchWords([]);
      searchArray = [];
    }
  }

  const submitSearch = (eventSubmit: any) => {
    eventSubmit.preventDefault();
    const result: any = words.find(x => x.descricao == search);

    searchArray = [...searchArray,result];
    setSearchWords(result ? searchArray : [] as Array<any>);
    searchArray = [];
  }
  

  window.addEventListener('resize', () => {
    setHeightScreen(resizeScreen());
  });

  return(
    <div className='lg:pt-10 progress-table w-full flex flex-col gap-3 lg:gap-5'>
          <div className='flex flex-col justify-between lg:items-center lg:flex-row w-full'>
            <div className='flex gap-3 items-center'>
              <h1 className='md:text-xl lg:2xl'>Palavras Aprendidas</h1>
              <span onClick={() => speech.textToSpeech('Palavras Aprendidas')}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
            </div>

            <form className="hidden lg:flex" onSubmit={submitSearch}>
              <div className="relative">
                <input type='text' className='lg:w-56 2xl:w-72 hidden lg:flex' placeholder='Digite uma palavra' onChange={handleChange}/>
                <button type="submit" className="px-2 text-black absolute right-0.5 bottom-3 bg-white text-sm">
                  {React.createElement(FaSearch, { size: "16"})}
                </button>
              </div>
            </form>
          </div>

          <div className={`w-full overflow-y-auto`} style={{height: `${heightScreen}px`}}>
            <table className="table-auto w-full">
              <tbody>
                {
                search != ''
                  ? searchWords?.map((searchWord: any, index: number) => (
                    <tr className='table-row' key={index}>
                      <td className=''><img className="h-10" src={searchWord.imagem} /></td>
                      <td className=''>{searchWord.descricao} </td>
                      <td className=''><span onClick={() => speech.textToSpeech(searchWord.descricao)}>{React.createElement(ImVolumeHigh, { size: "28"})}</span></td>
                      <td className='last-item-table'>+4</td>
                    </tr>
                  ))
                  : words?.map((word: any, index: number) => (
                      <tr className='table-row' key={index}>
                        <td className=''><img className="h-10" src={word.imagem} /></td>
                        <td className=''>{word.descricao}</td>
                        <td className=''><span onClick={() => speech.textToSpeech(word.descricao)}>{React.createElement(ImVolumeHigh, { size: "28"})}</span></td>
                        <td className='last-item-table'>+4</td>
                      </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

        </div>
  );
}