import './styles.scss'
import Speech from '../../assets/speech-icon.png'

import { useNavigate } from 'react-router-dom'
import { TextToSpeech } from '../../services/voice/voice-service';
import { LateralLoginImage } from '../../components/lateral-login-image';

export default function Main() {
    const navigate = useNavigate();

    const navigateToRegister = () => {
        return navigate('register');
    }

    const navigateToSignIn = () => {
        return navigate('login');
    }

    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full login'>
            <div className='flex flex-col justify-center text-center items-center px-12 sm:px-32 lg:px-32 2xl:px-64 gap-10'>
                    <div>
                        <span>Olá, Bem Vindo!</span>
                        <button className='speech' onClick={textToVoice}>
                            <img src={Speech} />
                        </button>
                        <h3>Entre na sua conta ou faça um cadastro</h3>
                    </div>
                    
                    <div id='buttons' className='flex flex-col justify-center text-center items-center w-full mx-auto gap-5'>
                            <button 
                                className='w-full absenior-button p-6 sm:p-4' 
                                onClick={navigateToSignIn}>
                                    Entrar
                            </button>
                            <button 
                                className='w-full absenior-button' 
                                onClick={navigateToRegister}>
                                    Cadastrar
                            </button>
                    </div>
            </div>
            <LateralLoginImage />
        </div>
    );
}

function textToVoice(): void {
    const speech: TextToSpeech = new TextToSpeech();
    const text: string = 'Olá, Bem Vindo! Nas opções abaixo, entre na sua conta ou faça um cadastro.';

    speech.textToSpeech(text);
}