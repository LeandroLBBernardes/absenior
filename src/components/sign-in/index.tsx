import './styles.scss'
import Logo from '../../assets/image-login.png'
import Speech from '../../assets/speech-icon.png'
import { TextToSpeech } from '../../services/voice/voice-service';

export function SignIn() {
    return(
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 h-screen w-full signin'>
             <div className='flex flex-col justify-center text-center items-center px-10 lg:px-32 2xl:px-64 gap-5'>
                    <div>
                        <span>Entrar</span>
                        <button className='speech' onClick={textToVoice}>
                            <img src={Speech} />
                        </button>
                        <h3>Digite seu e-mail e senha.</h3>
                    </div>
                    <div className='flex flex-col justify-center text-left items-left w-full mx-auto gap-5'>
                            <div>
                                <label>E-mail</label>
                                <input 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='email' 
                                    placeholder='Digite seu e-mail'
                                />
                            </div>
                            <div>
                                <label>Senha</label>
                                <input 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='password' 
                                    placeholder='Digite sua senha'
                                />
                            </div>
                            <button className='w-full absenior-button text-lg p-8 lg:p-8'>Confirmar</button>
                    </div>
            </div>
            <div className='hidden sm:block'>
                <img className='w-full h-screen object-cover' src={Logo} />
            </div>
        </div>
    );
}

function textToVoice(): void {
    const speech: TextToSpeech = new TextToSpeech();
    const text: string = 'Entrar! Nos espaços abaixo digite seu e-mail e sua senha!';

    speech.textToSpeech(text);
}