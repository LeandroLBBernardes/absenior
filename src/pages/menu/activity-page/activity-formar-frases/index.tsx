import './styles.scss'
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { SpeechButton } from '../../../../components/speech-button';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAuth } from '../../../../hooks/user-auth';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../../../services/users-service/users-supabase';
import { getInsignia, getPhrase, insertWordFromPhrase, insertuserPhrase, updatePontuationAndPhrase } from '../../../../services/word-service/words-service';
import { LoadingPage } from '../../../loading-page';
import { useState, useEffect } from 'react';
import { errorAlert, successAlert } from './utils';
import { useNavigate } from 'react-router-dom';

export function ActivityFormarFrases() {
    const { user }: any = useAuth();
    const navigate = useNavigate();
    const [wordList, setWordList] = useState([] as Array<string>);
    const [selectWordList, setSelectWordList] = useState([] as Array<string>);

    let indexList: Array<number> = [];
    
    const {data: dataUser, isLoading: isLoadingDataUser, refetch: refetchUser} = useQuery(['atividade3-usuario'], () => {
        return getUser(user.id);
    }); 

    const userId = dataUser?.idUsuario;

    const {status, data: dataPhrase, isLoading: isLoadingDataPhrase, refetch} = useQuery(['atividade3-frase', dataUser?.ultimaFrase, dataUser?.nivel], 
    () => {
        return getPhrase(dataUser.ultimaFrase, dataUser.nivel);
    },{
        enabled: !!userId
    });

    const insertWord = useMutation({
        mutationFn: ({phraseId, userId}: any) => {
            return insertuserPhrase(phraseId, userId);
        }
    });

    const updateUser = useMutation({
        mutationFn: ({phraseId, userId}: any) => {
            return updatePontuationAndPhrase(dataUser.ultimaFrase, phraseId, userId, dataUser.pontuacao+4, dataUser.nivel);
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

    const insertWordfromPhrase = useMutation({
        mutationFn: ({phrase,userId}: any) => {
            return insertWordFromPhrase(phrase, userId);
        }
    })

    useEffect(() => {
        if(status == "success") {
            if(dataPhrase.length > 0)
                fillWordList();
        }
    }, [status,dataPhrase]);


    if(isLoadingDataPhrase || isLoadingDataUser) {
        return(
            <LoadingPage />
        );
    }

    function fillWordList() {
        const phrase: string = dataPhrase[0].descricao;
        const wordArray: Array<string> = phrase.split(' ');
        const numberOfWords: number = wordArray.length;
        let auxArray: Array<string> = [];

        for(let i = 0; i < numberOfWords; i++) {
            const randomNumber: number = randomIndex(numberOfWords);

            auxArray = [...auxArray, 
                wordArray[randomNumber]
            ];
        }
        
        setWordList(auxArray);
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
        const numberOfLetter: number = dataPhrase[0].descricao.split(' ').length;

        for(let i = 0; i < numberOfLetter; i++) {
            const button: any = document.getElementById(i.toString());
            button.disabled = false;
        }

        setSelectWordList([]);
    }
    
    const joinLetters = (word: string, index: string) => {
        const button: any = document.getElementById(index);
        button.disabled = true;
        
        setSelectWordList([...selectWordList, word]);
    }

    const confirmWord = () => {
        if(selectWordList.join(' ').toUpperCase() != dataPhrase[0].descricao.toUpperCase()) {
            errorAlert();
        }else {
            successAlert();
            insertWord.mutate({phraseId: dataPhrase[0].idFrases, userId: user.id});
            updateUser.mutate({phraseId: dataPhrase[0].idFrases, userId: user.id});
            insertInsignia.mutate({userId: user.id});
            insertWordfromPhrase.mutate({phrase: dataPhrase[0].descricao, userId: user.id});
        }

        cleanFormedWord();
    }

    return(
        <div className='formar-frases min-h-screen w-full p-5'>
            {
            dataPhrase.length == 0
            ?
                <div className="grid grid-cols-1 h-full w-full error-page">
                    <div className="flex flex-col justify-center text-center items-center gap-5">
                        <div className='text-3xl md:text-4xl lg:text-6xl font-bold'>Você chegou ao final, parabéns!</div>
                        <div className='text-xl md:text-2xl lg:text-4xl font-bold text-[#9D9991]'>Obrigado por nos deixar fazer parte da sua jornada</div>
                        <button className='absenior-button w-48' onClick={() => navigate('../../../home/activity')}>Voltar</button>
                    </div>
                </div>
            : 
                <div className='card-formar-frases bg-white rounded-3xl w-full h-full px-8 flex flex-col'>
                <HeaderMenuPageComponent 
                    title="Selecione as palavras para formar uma frase: "
                    noProfile={true}
                    path='../../../home/activity'
                />

                <div className='w-full h-full flex flex-col gap-8 mt-8 lg:mt-0 lg:gap-3 md:grid md:grid-cols-1 lg:flex lg:flex-col mb-3'>
                    <div className='w-full h-full flex flex-col justify-start lg:justify-center items-center text-center gap-5'>
                        <div className='flex justify-center items-center text-center gap-3'>
                            <h1 className='text-2xl lg:text-4xl font-semibold uppercase'>{selectWordList.join(' ')}</h1>
                            <div className='delete-button' onClick={cleanFormedWord}>
                                <RiDeleteBin5Line size={28} />
                            </div>
                            <SpeechButton text={`Frase formada: ${selectWordList.join(' ') == '' ? 'nenhuma' : selectWordList.join(' ')}, Frase Correta: ${dataPhrase[0].descricao}`} size={28}/>
                        </div>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <div className={`grid grid-cols-2 md:grid-cols-3 lg:${wordList?.length <= 6 ? 'flex' : 'grid-cols-6'} gap-3 w-full px-5 py-2 buttons-letters place-content-center`}>
                            {wordList?.map((word,index) => (
                                <div key={index} className={`${wordList?.length <= 6 && 'lg:w-64 lg:min-w-18'} col-span-1 flex flex-col justify-center items-center text-center gap-2`}>
                                    <button id={index.toString()} className='w-full absenior-button rounded-full' onClick={() => joinLetters(word,index.toString())}>{word}</button>
                                    <SpeechButton text={`${word}`} size={22}/>
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