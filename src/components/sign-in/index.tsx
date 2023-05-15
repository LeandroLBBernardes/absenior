import './styles.scss'
import Speech from '../../assets/speech-icon.png'

import { useNavigate } from 'react-router-dom';
import { TextToSpeech } from '../../shared/services/voice/voice-service';
import { LateralLoginImage } from '../../shared/components/lateral-login-image';
import { useState } from 'react';
import { IUser } from './../../shared/interfaces/user-interface.interface';
import { supabase } from '../../shared/services/supabase/supabase';

export function SignIn() {
    const [user, setUser] = useState({} as IUser);
    const navigate = useNavigate();


    const handleChange = (event: any) => {
        setUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    }

    const submitForm = async (eventSubmit: any) => {
        eventSubmit.preventDefault();

        let response = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        })

        console.log(response);
    }


    const navigateToRegister = () => {
        return navigate('../register');
    }


    return(
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 h-screen w-full signin'>
             <form 
                className='flex flex-col justify-center text-center items-center px-10 lg:px-32 2xl:px-64 gap-5'
                onSubmit={submitForm}>
                    <div>
                        <span>Entrar</span>
                        <button className='speech' onClick={textToVoice}>
                            <img src={Speech} />
                        </button>
                        <h3>Digite seu e-mail e senha.</h3>
                    </div>
                    <div className='flex flex-col justify-center text-left items-left w-full mx-auto gap-5'>
                            <div>
                                <label htmlFor='email'>E-mail</label>
                                <input
                                    required
                                    id='email'
                                    name='email' 
                                    className='w-full absenior-input p-4 lg:p-4'
                                    type='email' 
                                    placeholder='Digite seu e-mail'
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <label htmlFor='password'>Senha</label>
                                <input
                                    required
                                    id='password'
                                    name='password' 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='password' 
                                    placeholder='Digite sua senha'
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </div>
                            <button className='w-full absenior-button text-lg p-8 lg:p-8' type='submit'>Confirmar</button>
                            <p>Não possui uma conta? 
                                <a className='underline cursor-pointer' onClick={navigateToRegister}>Cadastrar</a>
                            </p>
                    </div>
                </form>
            <LateralLoginImage />
        </div>
    );
}

function textToVoice(): void {
    const speech: TextToSpeech = new TextToSpeech();
    const text: string = 'Entrar! Nos espaços abaixo digite seu e-mail e sua senha e depois clique em confirmar!';

    speech.textToSpeech(text);
}