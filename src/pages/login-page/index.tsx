import './styles.scss'
import Speech from '../../assets/speech-icon.png'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IUser } from '../../interfaces/user-interface.interface';
import { supabase } from '../../services/supabase/supabase';
import { LateralLoginImage } from '../../components/lateral-login-image';
import { TextToSpeech } from '../../services/voice/voice-service';
import { InputForm } from '../../components/input-form';


export function Login() {
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
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full signin'>
             <form 
                className='flex flex-col justify-center text-center items-center px-12 sm:px-32 lg:px-32 2xl:px-64 gap-5 sm:gap-2'
                onSubmit={submitForm}>
                    <div>
                        <span>Entrar</span>
                        <button className='speech' onClick={textToVoice}>
                            <img src={Speech} />
                        </button>
                        <h3>Digite seu e-mail e senha.</h3>
                    </div>
                    <div className='flex flex-col justify-center text-left items-left w-full mx-auto gap-5'>
                            <InputForm
                                label='E-mail' 
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Digite seu e-mail'
                                onValueChange={handleChange}
                            />
                            <InputForm
                                label='Senha' 
                                id='senha'
                                name='senha'
                                type='senha'
                                placeholder='Digite sua senha'
                                onValueChange={handleChange}
                            />
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