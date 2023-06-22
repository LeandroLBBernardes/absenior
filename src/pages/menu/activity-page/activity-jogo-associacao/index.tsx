import './styles.scss'
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { SpeechButton } from '../../../../components/speech-button';
import { useAuth } from '../../../../hooks/user-auth';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../../../services/users-service/users-supabase';
import { getInsignia, getRandomWords, getWord, insertuserWord, updatePontuationAndAssociation } from '../../../../services/word-service/words-service';
import { LoadingPage } from '../../../loading-page';
import { useState, useEffect } from 'react';
import { errorAlert, successAlert } from './utils';
import { useNavigate } from 'react-router-dom';

export default function ActivityJogoAssociacao() {
    const { user }: any = useAuth();
    const navigate = useNavigate();
    const [wordList, setWordList] = useState([] as Array<any>);
    const [selectWord, setSelectWord] = useState({idPalavra: Number, descricao: String, imagem: String, complexidade: Number});
    const [btnClick, setBtnClick] = useState(-1);
    
    let indexList: Array<number> = [];
    
    const {data: dataUser, isLoading: isLoadingDataUser, refetch: refetchUser} = useQuery(['atividade4-usuario'], () => {
        return getUser(user.id);
    }); 

    const userId = dataUser?.idUsuario;

    const {data: dataWord, isLoading: isLoadingDataWord, refetch: refetchWord} = useQuery(['atividade4-palavra', dataUser?.ultimaPalavraAssociacao, dataUser?.nivel], 
    () => {
        return getWord(dataUser.ultimaPalavraAssociacao, dataUser.nivel);
    },{
        enabled: !!userId
    });

    const wordId = dataWord?.length;

    const {status, data: dataRandom, isLoading: isLoadingRandom, refetch} = useQuery(['atividade4-random',dataUser?.ultimaPalavraAssociacao, dataUser?.nivel], 
    () => {
        return getRandomWords();
    },{
        enabled: !!wordId
    });

    const insertWord = useMutation({
        mutationFn: ({wordId, userId}: any) => {
            return insertuserWord(wordId, userId);
        }
    });

    const updateUser = useMutation({
        mutationFn: ({wordId, userId}: any) => {
            return updatePontuationAndAssociation(dataUser.ultimaPalavraAssociacao, wordId, userId, dataUser.pontuacao+4, dataUser.nivel);
        },
        onSuccess: () => {
          refetchUser(); 
          refetchWord(); 
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
            if(dataRandom.length > 0)
                fillWordList();
        }
    }, [status,dataWord]);


    if(isLoadingDataWord || isLoadingDataUser || isLoadingRandom) {
        return(
            <LoadingPage />
        );
    }

    function fillWordList() {
        let wordAuxArray: Array<any> = dataRandom;
        wordAuxArray = [...wordAuxArray, dataWord[0]];

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

            setSelectWord(word);
            setBtnClick(Number(index));
        }else {
            button.style.background = "#F6C66A";
            button.style.color = "#474747";

            setSelectWord({idPalavra: Number, descricao: String, imagem: String, complexidade: Number});
            setBtnClick(-1);
        }
    }

    const confirmWord = () => {
        if(selectWord != undefined && selectWord.idPalavra == dataWord[0].idPalavra) {
            successAlert();
            insertWord.mutate({wordId: dataWord[0].idPalavra, userId: user.id});
            updateUser.mutate({wordId: dataWord[0].idPalavra, userId: user.id});
            insertInsignia.mutate({userId: user.id});
        }else {
            errorAlert();
        }

        cleanFormedWord();
    }

    return(
        <div className='jogo-associacao min-h-screen w-full p-5'>
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
                <div className='card-jogo-associacao bg-white rounded-3xl w-full h-full px-8 flex flex-col'>
                <HeaderMenuPageComponent 
                    title="Selecione a palavra que represente a imagem abaixo: "
                    noProfile={true}
                    path='../../../home/activity'
                />

                <div className='w-full h-full flex flex-col gap-3 md:grid md:grid-cols-1 lg:flex lg:flex-col mb-3'>
                    <div className='w-full h-full flex flex-col justify-start lg:justify-center items-center text-center gap-5'>
                        <img className='w-80 max-h-80 md:w-56 lg:w-56 lg:max-h-56 2xl:w-96 2xl:max-h-96' src={dataWord[0].imagem}/>
                        <div className='flex justify-center items-center text-center gap-3'>
                            <SpeechButton text={`Imagem: ${dataWord[0].descricao}`} size={28}/>
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