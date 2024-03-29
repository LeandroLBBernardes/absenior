import './styles.scss'
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { SpeechButton } from '../../../../components/speech-button';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAuth } from '../../../../hooks/user-auth';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../../../services/users-service/users-supabase';
import { getInsignia, getWord, insertuserWord, updatePontuationAndWord } from '../../../../services/word-service/words-service';
import { LoadingPage } from '../../../loading-page';
import { useState, useEffect } from 'react';
import { errorAlert, successAlert } from './utils';
import { useNavigate } from 'react-router-dom';

export default function ActivityFormarPalavras() {
    const { user }: any = useAuth();
    const navigate = useNavigate();
    const [charList, setCharList] = useState([] as Array<string>);
    const [formedWord, setFormedWord] = useState('');
    
    let indexList: Array<number> = [];
    
    const {data: dataUser, isLoading: isLoadingDataUser, refetch: refetchUser} = useQuery(['atividade1-usuario'], () => {
        return getUser(user.id);
    }); 

    const userId = dataUser?.idUsuario;

    const {status, data: dataWord, isLoading: isLoadingDataWord, refetch} = useQuery(['atividade1-palavra', dataUser?.ultimaPalavraAprendida, dataUser?.nivel], 
    () => {
        return getWord(dataUser.ultimaPalavraAprendida, dataUser.nivel);
    },{
        enabled: !!userId
    });

    const insertWord = useMutation({
        mutationFn: ({wordId, userId}: any) => {
            return insertuserWord(wordId, userId);
        }
    });

    const updateUser = useMutation({
        mutationFn: ({wordId, userId}: any) => {
            return updatePontuationAndWord(dataUser.ultimaPalavraAprendida, wordId, userId, dataUser.pontuacao+4, dataUser.nivel);
        },
        onSuccess: () => {
          refetchUser();  
          refetch();
        }
    });

    const insertInsignia = useMutation({
        mutationFn: ({userId}: any) => {
            return getInsignia(dataUser.pontuacao+4, userId);
        }
    });

    useEffect(() => {
        if(status == "success") {
            if(dataWord.length > 0)
                fillCharList();
        }
    }, [status,dataWord]);


    if(isLoadingDataWord || isLoadingDataUser) {
        return(
            <LoadingPage />
        );
    }

    function fillCharList() {
        const word: string = dataWord[0].descricao;
        const numberOfLetters: number = word.length;
        let auxArray: Array<string> = [];

        for(let i = 0; i < numberOfLetters; i++) {
            const randomNumber: number = randomIndex(numberOfLetters);

            auxArray = [...auxArray, 
                word[randomNumber]
            ];
        }
        
        setCharList(auxArray);
        indexList = [];
    }

    function randomIndex(numberOfLetters: number) {
        let rand: number = Math.floor(Math.random() * numberOfLetters);

        while(indexList.includes(rand)) {
            rand = Math.floor(Math.random() * numberOfLetters);
        }

        indexList.push(rand);
        return rand;
    }

    const cleanFormedWord = () => {
        const numberOfLetter: number = dataWord[0].descricao.length;

        for(let i = 0; i < numberOfLetter; i++) {
            const button: any = document.getElementById(i.toString());
            button.disabled = false;
        }

        setFormedWord('');
    }
    
    const joinLetters = (letter: string, index: string) => {
        const button: any = document.getElementById(index);
        button.disabled = true;
        setFormedWord(formedWord+letter);
    }

    const confirmWord = () => {
        if(formedWord.toUpperCase() != dataWord[0].descricao.toUpperCase()) {
            errorAlert();
        }else {
            successAlert();
            insertWord.mutate({wordId: dataWord[0].idPalavra, userId: user.id});
            updateUser.mutate({wordId: dataWord[0].idPalavra, userId: user.id});
            insertInsignia.mutate({userId: user.id});
        }

        cleanFormedWord();
    }

    return(
        <div className='formar-palavras min-h-screen w-full p-5'>
            {
            dataWord.length == 0
            ?
                <div className="grid grid-cols-1 h-full w-full error-page">
                    <div className="flex flex-col justify-center text-center items-center gap-5">
                        <div className='text-3xl md:text-4xl lg:text-6xl font-bold'>Você chegou ao final, parabéns!</div>
                        <div className='text-xl md:text-2xl lg:text-4xl font-bold text-[#9D9991]'>Obrigado por nos deixar fazer parte da sua jornada</div>
                        <button className='absenior-button w-48' onClick={() => navigate('../../../home/activity')}>Voltar</button>
                    </div>
                </div>
            : 
                <div className='card-formar-palavras bg-white rounded-3xl w-full h-full px-8 flex flex-col'>
                <HeaderMenuPageComponent 
                    title="Selecione as letras para formar a palavra que represente a imagem abaixo: "
                    noProfile={true}
                    path='../../../home/activity'
                />

                <div className='w-full h-full flex flex-col gap-3 md:grid md:grid-cols-2 lg:flex lg:flex-col mb-3'>
                    <div className='w-full h-full flex flex-col justify-start lg:justify-center items-center text-center gap-5'>
                        <img className='w-80 max-h-80 md:w-56 lg:w-56 lg:max-h-56 2xl:w-96 2xl:max-h-96' src={dataWord[0].imagem}/>
                        <div className='flex justify-center items-center text-center gap-3'>
                            <h1 className='text-xl font-semibold uppercase'>{formedWord}</h1>
                            <div className='delete-button' onClick={cleanFormedWord}>
                                <RiDeleteBin5Line size={22} />
                            </div>
                            <SpeechButton text={`Palavra formada: ${formedWord == '' ? 'nenhuma' : formedWord}, Imagem: ${dataWord[0].descricao}`} size={22}/>
                        </div>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <div className='grid grid-cols-3 lg:flex gap-3 w-full px-5 py-2 buttons-letters place-content-center'>
                            {charList?.map((char,index) => (
                                <div key={index} className={`lg:w-24 lg:min-w-18 col-span-1 flex flex-col justify-center items-center text-center gap-2`}>
                                    <button id={index.toString()} className='w-full absenior-button rounded-full' onClick={() => joinLetters(char,index.toString())}>{char}</button>
                                    <SpeechButton text={`Letra: ${char}`} size={22}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />
                <div className='p-5 md:p-3 lg:py-3 flex flex-row justify-end md:gap-5 w-full'>
                    <button className={`absenior-button w-44`} onClick={confirmWord}>Confirmar</button>
                </div>
            </div>
            }
            
        </div>  
    );
}