import './styles.scss'
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { SpeechButton } from '../../../../components/speech-button';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAuth } from '../../../../hooks/user-auth';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../../../services/users-service/users-supabase';
import { getInsignia, getWord, insertuserWord, updatePontuationAndSyllables } from '../../../../services/word-service/words-service';
import { LoadingPage } from '../../../loading-page';
import { useState, useEffect } from 'react';
import { errorAlert, successAlert } from './utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function ActivityFormarSilabas() {
    const { user }: any = useAuth();
    const navigate = useNavigate();
    const [syllablesList, setSyllablesList] = useState([] as Array<string>);
    const [formedWordSyllables, setFormedWordSyllables] = useState('');
    
    let indexList: Array<number> = [];
    
    const {data: dataUser, isLoading: isLoadingDataUser, refetch: refetchUser} = useQuery(['atividade2-usuario'], () => {
        return getUser(user.id);
    }); 

    const userId = dataUser?.idUsuario;

    const {data: dataWord, isLoading: isLoadingDataWord, refetch: refetchWord} = useQuery(['atividade2-palavra',dataUser?.ultimaPalavraSilabas, dataUser?.nivel], 
    () => {
        return getWord(dataUser.ultimaPalavraSilabas, dataUser.nivel);
    },{
        enabled: !!userId
    });

    const wordId = dataWord?.length;

    const {status, data: dataSyllables, isLoading: isLoadingSyllables, refetch} = useQuery(['atividade2-silabas',dataUser?.ultimaPalavraSilabas, dataUser?.nivel], 
    () => {
        return axios.get(`https://crud-node-7js5-git-master-leandrolbbernardes.vercel.app/silabas/${dataWord[0].descricao}`).then(response => response.data)
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
            return updatePontuationAndSyllables(dataUser.ultimaPalavraSilabas, wordId, userId, dataUser.pontuacao+4, dataUser.nivel);
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
            if(dataSyllables.length > 0)
                fillSyllablesList();
        }
    }, [status,dataSyllables]);


    if(isLoadingDataWord || isLoadingDataUser || isLoadingSyllables) {
        return(
            <LoadingPage />
        );
    }

    function fillSyllablesList() {
        const numberOfLetters: number = dataSyllables.length;
        let auxArray: Array<string> = [];

        for(let i = 0; i < numberOfLetters; i++) {
            const randomNumber: number = randomIndex(numberOfLetters);

            auxArray = [...auxArray, 
                dataSyllables[randomNumber]
            ];
        }
        
        setSyllablesList(auxArray);
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
        const numberOfLetter: number = syllablesList.length;

        for(let i = 0; i < numberOfLetter; i++) {
            const button: any = document.getElementById(i.toString());
            console.log();
            button.disabled = false;
        }

        setFormedWordSyllables('');
    }
    
    const joinLetters = (letter: string, index: string) => {
        const button: any = document.getElementById(index);
        button.disabled = true;
        setFormedWordSyllables(formedWordSyllables+letter);
    }

    const confirmWord = () => {
        if(formedWordSyllables.toUpperCase() != dataWord[0].descricao.toUpperCase()) {
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
        <div className='formar-silabas min-h-screen w-full p-5'>
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
                <div className='card-formar-silabas bg-white rounded-3xl w-full h-full px-8 flex flex-col'>
                <HeaderMenuPageComponent 
                    title="Selecione as sílabas para formar a palavra que represente a imagem abaixo: "
                    noProfile={true}
                    path='../../../home/activity'
                />

                <div className='w-full h-full flex flex-col gap-3 md:grid md:grid-cols-2 lg:flex lg:flex-col mb-3'>
                    <div className='w-full h-full flex flex-col justify-start lg:justify-center items-center text-center gap-5'>
                        <img className='w-80 max-h-80 md:w-56 lg:w-56 lg:max-h-56 2xl:w-96 2xl:max-h-96' src={dataWord[0].imagem}/>
                        <div className='flex justify-center items-center text-center gap-3'>
                            <h1 className='text-xl font-semibold uppercase'>{formedWordSyllables}</h1>
                            <div className='delete-button' onClick={cleanFormedWord}>
                                <RiDeleteBin5Line size={22} />
                            </div>
                            <SpeechButton text={`Palavra formada: ${formedWordSyllables == '' ? 'nenhuma' : formedWordSyllables}, Imagem: ${dataWord[0].descricao}`} size={22}/>
                        </div>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <div className='grid grid-cols-3 lg:flex gap-3 w-full px-5 py-2 buttons-letters place-content-center'>
                            {syllablesList?.map((syllable,index) => (
                                <div key={index} className={`lg:w-24 lg:min-w-18 col-span-1 flex flex-col justify-center items-center text-center gap-2`}>
                                    <button id={index.toString()} className='w-full absenior-button rounded-full' onClick={() => joinLetters(syllable,index.toString())}>{syllable}</button>
                                    <SpeechButton text={`Letra: ${syllable}`} size={22}/>
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