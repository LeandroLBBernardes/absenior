import './styles.scss'
import Speech from '../../assets/speech-icon.png'

import { useNavigate } from 'react-router-dom';
import { TextToSpeech } from '../../shared/services/voice/voice-service';
import { LateralLoginImage } from '../../shared/components/lateral-login-image';

export function Register() {
    const navigate = useNavigate();

    const navigateToSignIn = () => {
        return navigate('../signin');
    }

    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full register'>
             <div className='flex flex-col justify-center text-center items-center px-10 sm:px-32 sm:py-8 lg:px-32 2xl:px-64 gap-5'>
                    <div>
                        <span>Cadastro</span>
                        <button className='speech' onClick={textToVoice}>
                            <img src={Speech} />
                        </button>
                        <h3>Informe seu nome, seu email, sua escola e sua senha.</h3>
                    </div>
                    <div className='flex flex-col justify-center text-left items-left w-full mx-auto gap-5'>
                            <div>
                                <label htmlFor='name'>Nome</label>
                                <input
                                    id='name'
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='text' 
                                    placeholder='Digite seu nome'
                                />
                            </div>
                            <div>
                                <label htmlFor='email'>E-mail</label>
                                <input
                                    id='email' 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='email' 
                                    placeholder='Digite seu e-mail'
                                />
                            </div>
                            <div>
                                <label htmlFor='school'>Escola</label>
                                <input
                                    id='school' 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='email' 
                                    placeholder='Digite sua escola'
                                />
                            </div>
                            <div>
                                <label htmlFor='password'>Senha</label>
                                <input
                                    id='password' 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='password' 
                                    placeholder='Digite sua senha'
                                />
                            </div>
                            <button className='w-full absenior-button text-lg p-8 lg:p-8'>Confirmar</button>
                            <p>Já possui uma conta? 
                                <a className='underline cursor-pointer' onClick={navigateToSignIn}>Entrar</a>
                            </p>
                    </div>
            </div>
            <LateralLoginImage />
        </div>
    );
}

function textToVoice(): void {
    const speech: TextToSpeech = new TextToSpeech();
    const text: string = 'Cadastrar! Nos espaços abaixo digite seu nome, seu e-mail, sua escola e sua senha, depois clique em confirmar!';

    speech.textToSpeech(text);
}