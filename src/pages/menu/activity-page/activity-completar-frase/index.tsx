import './styles.scss'
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { SpeechButton } from '../../../../components/speech-button';
import { useAuth } from '../../../../hooks/user-auth';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../../../services/users-service/users-supabase';
import { getInsignia, getPhrase, getRandomWords, insertWordFromPhrase, insertuserPhrase, updatePontuationAndPhraseComplet } from '../../../../services/word-service/words-service';
import { LoadingPage } from '../../../loading-page';
import { useState, useEffect } from 'react';
import { errorAlert, successAlert } from './utils';
import { useNavigate } from 'react-router-dom';

export default function ActivityJogoCompletarFrase() {
    const { user }: any = useAuth();
    const navigate = useNavigate();
    const [wordList, setWordList] = useState([] as Array<any>);
    const [arrayWordsStart, setArrayWordsStart] = useState([] as Array<string>);
    const [arrayWordsEnd, setArrayWordsEnd] = useState([] as Array<string>);
    const [selectedWord, setSelectedWord] = useState('‎');
    const [btnClick, setBtnClick] = useState(-1);
    
    let indexList: Array<number> = [];
    
    const {data: dataUser, isLoading: isLoadingDataUser, refetch: refetchUser} = useQuery(['atividade6-usuario'], () => {
        return getUser(user.id);
    }); 

    const userId = dataUser?.idUsuario;

    const {data: dataPhrase, isLoading: isLoadingDataPhrase, refetch: refetchPhrase} = useQuery(['atividade6-frase', dataUser?.ultimaFraseCompletar, dataUser?.nivel], 
    () => {
        return getPhrase(dataUser.ultimaFraseCompletar, dataUser.nivel);
    },{
        enabled: !!userId
    });

    const phraseLength = dataPhrase?.length;

    const {status, data: dataRandom, isLoading: isLoadingRandom, refetch} = useQuery(['atividade6-random',dataUser?.ultimaFraseCompletar, dataUser?.nivel], 
    () => {
        return getRandomWords();
    },{
        enabled: !!phraseLength
    });

    const insertWord = useMutation({
        mutationFn: ({phraseId, userId}: any) => {
            return insertuserPhrase(phraseId, userId);
        }
    });

    const updateUser = useMutation({
        mutationFn: ({phraseId, userId}: any) => {
            return updatePontuationAndPhraseComplet(dataUser.ultimaFraseCompletar, phraseId, userId, dataUser.pontuacao+4, dataUser.nivel);
        },
        onSuccess: () => {
          refetchUser();
          refetchPhrase();  
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
            if(dataRandom.length > 0)
                fillWordList();
        }
    }, [status,dataPhrase]);


    if(isLoadingDataPhrase || isLoadingDataUser || isLoadingRandom) {
        return(
            <LoadingPage />
        );
    }

    function fillWordList() {
        let wordAuxArray: Array<any> = dataRandom;
        let arrayWord: Array<string> = dataPhrase[0].descricao.split(' ');

        setArrayWordsStart([arrayWord[0],arrayWord[1]]);
        setArrayWordsEnd(arrayWord.slice(3));

        wordAuxArray = [...wordAuxArray, {descricao: arrayWord[2]}];
        console.log(wordAuxArray);

        const numberOfLetters: number = wordAuxArray.length;
        let auxArray: Array<string> = [];

        for(let i = 0; i < numberOfLetters; i++) {
            const randomNumber: number = randomIndex(numberOfLetters);

            auxArray = [...auxArray, 
                wordAuxArray[randomNumber]
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
        const numberOfLetter: number = wordList.length;

        for(let i = 0; i < numberOfLetter; i++) {
            const button: any = document.getElementById(i.toString());
            button.disabled = false;
        }

        setSelectedWord('‎');
    }
    
    const confirmImage = (word: any, index: string) => {
        const button: any = document.getElementById(index);

        if(Number(index) != btnClick) {
            button.style.background = "#EC6D41";
            button.style.color = "white";

            for(let i = 0; i < wordList.length; i++) {
                if(i != Number(index)) {
                    const button: any = document.getElementById(i.toString());
                    button.style.background = "#F6C66A";
                    button.style.color = "#474747";
                }
            }

            setSelectedWord(word.descricao);
            setBtnClick(Number(index));
        }else {
            button.style.background = "#F6C66A";
            button.style.color = "#474747";

            setSelectedWord('‎');
            setBtnClick(-1);
        }
    }

    const confirmWord = () => {
        if(selectedWord != undefined 
        && arrayWordsStart.concat([selectedWord],arrayWordsEnd).join(' ').toUpperCase() === dataPhrase[0].descricao.toUpperCase()) 
        {
            successAlert();
            insertWord.mutate({phraseId: dataPhrase[0].idFrases, userId: user.id});
            updateUser.mutate({phraseId: dataPhrase[0].idFrases, userId: user.id});
            insertInsignia.mutate({userId: user.id});
            insertWordfromPhrase.mutate({phrase: dataPhrase[0].descricao, userId: user.id});
        }else {
            errorAlert();
        }

        cleanFormedWord();
    }

    return(
        <div className='jogo-completar-frase min-h-screen w-full p-5'>
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
                <div className='card-jogo-completar-frase bg-white rounded-3xl w-full h-full px-8 flex flex-col'>
                <HeaderMenuPageComponent 
                    title="Selecione a palavra que complete a frase abaixo: "
                    noProfile={true}
                    path='../../../home/activity'
                />

                <div className='w-full h-full flex flex-col gap-10 mt-5 md:mt-10 md:gap-10 lg:mt-0 lg:gap-3 md:grid md:grid-cols-1 lg:flex lg:flex-col mb-3 '>
                    <div className='w-full h-full flex flex-col justify-start lg:justify-center items-center text-center gap-5'>
                        <div className='flex justify-center items-center text-center gap-1'>
                            <div className='flex flex-col lg:flex-row justify-center gap-3 text-center items-center '>
                                <h1 className='text-2xl lg:text-2xl 2xl:text-4xl font-semibold uppercase'>{arrayWordsStart.join(' ')}</h1>
                                <span className='word-down text-xl font-semibold uppercase'>{selectedWord}</span>
                                <h1 className='text-2xl lg:text-2xl 2xl:text-4xl font-semibold uppercase'>{arrayWordsEnd.join(' ')}</h1>
                            </div>
                            <SpeechButton text={`${dataPhrase[0].descricao}`} size={28}/>
                        </div>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:flex gap-3 w-full px-5 py-2 buttons-letters place-content-center'>
                            {wordList?.map((word,index) => (
                                <div key={index} className={`lg:w-64 lg:min-w-18 col-span-1 flex flex-col justify-center items-center text-center gap-2`}>
                                    <button id={index.toString()} className='w-full absenior-button rounded-full' onClick={() => confirmImage(word, index.toString())}>{word.descricao}</button>
                                    <SpeechButton text={`${word.descricao}`} size={22}/>
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