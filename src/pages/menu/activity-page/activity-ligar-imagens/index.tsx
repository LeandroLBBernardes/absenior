import './styles.scss'
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { SpeechButton } from '../../../../components/speech-button';
import { useAuth } from '../../../../hooks/user-auth';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../../../services/users-service/users-supabase';
import { getInsignia, getWord4, insertWordsLinkImage, updatePontuationAndLinkImage } from '../../../../services/word-service/words-service';
import { LoadingPage } from '../../../loading-page';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from './utils';

export default function ActivityLigarImagens() {
    const { user }: any = useAuth();
    const navigate = useNavigate();
    const [wordList, setWordList] = useState(Array<{idPalavra: Number, descricao: String, imagem: String, complexidade: Number}>);
    const [imageList, setImageList] = useState(Array<{idPalavra: Number, descricao: String, imagem: String, complexidade: Number}>);

    const [lock, setLock] = useState(true);

    const [btnImageClick, setBtnImageClick] = useState(-1);
    const [btnWordClick, setBtnWordClick] = useState(-1);

    const [selectedImage, setSelectedImage] = useState({idPalavra: Number, descricao: String, imagem: String, complexidade: Number});

    const [count, setCount] = useState(0);

    let indexList: Array<number> = [];
    
    const {data: dataUser, isLoading: isLoadingDataUser, refetch: refetchUser} = useQuery(['atividade1-usuario'], () => {
        return getUser(user.id);
    }); 

    const userId = dataUser?.idUsuario;

    const {status, data: dataWord, isLoading: isLoadingDataWord, refetch} = useQuery(['atividade1-palavra', dataUser?.ultimaPalavraLigarImagem, dataUser?.nivel], 
    () => {
        return getWord4(dataUser.ultimaPalavraLigarImagem, dataUser.nivel);
    },{
        enabled: !!userId
    });

    const insertWord = useMutation({
        mutationFn: ({words, userId}: any) => {
            return insertWordsLinkImage(words, userId);
        }
    });

    const updateUser = useMutation({
        mutationFn: ({wordId, userId}: any) => {
            return updatePontuationAndLinkImage(dataUser.ultimaPalavraLigarImagem, wordId, userId, dataUser.pontuacao+4, dataUser.nivel);
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
            if(dataWord.length > 0) {
                fillWordList();
                fillImageList();
            }
        }
    }, [status,dataWord]);


    if(isLoadingDataWord || isLoadingDataUser) {
        return(
            <LoadingPage />
        );
    }

    function fillWordList() {
        const numberOfWords: number = dataWord.length;
        let auxArray: Array<{idPalavra: Number, descricao: String, imagem: String, complexidade: Number}> = [];

        for(let i = 0; i < numberOfWords; i++) {
            const randomNumber: number = randomIndex(numberOfWords);

            auxArray = [...auxArray, 
                dataWord[randomNumber]
            ];
        }
        
        setWordList(auxArray);
        indexList = [];
    }

    function fillImageList() {
        const numberOfWords: number = dataWord.length;
        let auxArray: Array<{idPalavra: Number, descricao: String, imagem: String, complexidade: Number}> = [];

        for(let i = 0; i < numberOfWords; i++) {
            const randomNumber: number = randomIndex(numberOfWords);

            auxArray = [...auxArray, 
                dataWord[randomNumber]
            ];
        }
        
        setImageList(auxArray);
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
        const numberOfLetter: number = dataWord.length;

        for(let i = 0; i < numberOfLetter; i++) {
            const button: any = document.getElementById(i.toString());
            button.disabled = false;
        }

        for(let i = 10; i < numberOfLetter+10; i++) {
            const button: any = document.getElementById(i.toString());
            button.disabled = false;
        }
    }
    
    const chooseImage = (word: any, index: string) => {
        const button: any = document.getElementById(index);

        if(Number(index) != btnImageClick) {
            button.style.background = "#BCDCDE";
            button.style.borderColor = "#508E92";
            button.style.borderWidth = "thick";

            for(let i = 0; i < wordList.length; i++) {
                if(i != Number(index)) {
                    const button: any = document.getElementById(i.toString());
                    button.style.background = "white";
                    button.style.borderColor = "#CDCDCD";
                    button.style.borderWidth = "1px";
                }
            }

            setLock(false);
            setBtnImageClick(Number(index));
            setSelectedImage(word);
        }else {
            button.style.background = "white";
            button.style.borderColor = "#CDCDCD";
            button.style.borderWidth = "1px";

            for(let i = 10; i < wordList.length+10; i++) {
                const button: any = document.getElementById(i.toString());
                button.style.background = "white";
                button.style.borderColor = "#CDCDCD";
                button.style.borderWidth = "1px";
            }

            setBtnImageClick(-1);
            setLock(true);
            setSelectedImage({idPalavra: Number, descricao: String, imagem: String, complexidade: Number});
        }
    }

    const chooseWord = (word: any, index: string) => {
        const button: any = document.getElementById((Number(index)+10).toString());

        if(!lock) {
            if(Number(index)+10 != btnWordClick) {
                button.style.background = "#BCDCDE";
                button.style.borderColor = "#508E92";
                button.style.borderWidth = "thick";
    
                for(let i = 10; i < wordList.length+10; i++) {
                    if(i != Number(index)+10) {
                        const button: any = document.getElementById(i.toString());
                        button.style.background = "white";
                        button.style.borderColor = "#CDCDCD";
                        button.style.borderWidth = "1px";
                    }
                }
    
                setBtnWordClick(Number(index)+10);
                confirmAnswer(word, Number(index)+10);
            }else {
                button.style.background = "white";
                button.style.borderColor = "#CDCDCD";
                button.style.borderWidth = "1px";
    
                setBtnWordClick(-1);
            }
        }
    }

    const confirmAnswer = (word: any, index: number) => {
        if(word == selectedImage) {
            const aux: number = count+1;
            console.log(aux);
            setCount(aux);

            const buttonImage: any = document.getElementById(btnImageClick.toString());
            const buttonWord: any = document.getElementById(index.toString());

            buttonImage.style.background = "white";
            buttonImage.style.borderColor = "#CDCDCD";
            buttonImage.style.borderWidth = "1px";

            buttonWord.style.background = "white";
            buttonWord.style.borderColor = "#CDCDCD";
            buttonWord.style.borderWidth = "1px";

            buttonWord.disabled = true;
            buttonImage.disabled = true;

            setBtnWordClick(-1);
            setBtnImageClick(-1);

            if(aux == 4) {
                confirmWord(aux);
            }
        }else {
            errorAlert('Resposta errada!');
        }
    }


    const confirmWord = (countAnswers: number) => {
        if(countAnswers < 4) {
            errorAlert('Faltam imagens para relacionar!');
        }else {
            setCount(0);
            successAlert();
            insertWord.mutate({words: dataWord, userId: user.id});
            updateUser.mutate({wordId: dataWord[3].idPalavra, userId: user.id});
            insertInsignia.mutate({userId: user.id});
        }

        cleanFormedWord();
    }

    return(
        <div className='ligar-imagens min-h-screen w-full p-5'>
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
                <div className='card-ligar-imagens bg-white rounded-3xl w-full h-full px-8 flex flex-col'>
                    <HeaderMenuPageComponent 
                        title="Relacione as imagens com a palavra abaixo: "
                        noProfile={true}
                        path='../../../home/activity'
                    />

                    <div className='w-full h-full flex flex-col gap-8 mt-8 md:mt-0 md:mb-3 lg:mb-8 lg:gap-3 md:grid md:grid-cols-2 md:divide-x '>
                        <div className='flex justify-center items-center text-center w-full'>
                            <div className={`grid grid-cols-2 gap-3 w-full h-full px-5 py-2 buttons-letters place-content-center`}>
                                {imageList?.map((word,index) => (
                                    <div key={index} className={`flex flex-col justify-center items-center text-center gap-2`}>
                                        <button id={index.toString()} className='w-full absenior-button flex items-center justify-center button-image' onClick={() => chooseImage(word, index.toString())}>
                                            <img className='object-scale-down w-16 lg:w-28 2xl:w-44' src={word.imagem.toString()} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex justify-center items-center text-center w-full'>
                            <div className={`grid grid-cols-2 gap-3 w-full h-full px-5 py-2 buttons-letters place-content-center`}>
                                {wordList?.map((word,index) => (
                                    <div key={index} className={`col-span-1 row-span-1 flex flex-col justify-center items-center text-center gap-2`}>
                                        <button id={(index+10).toString()} className='w-full absenior-button rounded-full' onClick={() => chooseWord(word, index.toString())}>{word.descricao}</button>
                                        <SpeechButton text={`${word.descricao}`} size={22}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>  
    );
}