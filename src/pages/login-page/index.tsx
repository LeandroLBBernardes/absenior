import './styles.scss'
import Speech from '../../assets/speech-icon.png'
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IUser } from '../../interfaces/user-interface.interface';
import { supabase } from '../../services/supabase/supabase';
import { LateralLoginImage } from '../../components/lateral-login-image';
import { TextToSpeech } from '../../services/voice/voice-service';
import { InputForm } from '../../components/input-form';
import { ptBr } from '../../config/i18n/generals-pt-br';

export function Login() {
    const [userData, setUserData] = useState({} as IUser);
    const navigate = useNavigate();
    const speech: TextToSpeech = new TextToSpeech();

    const handleChange = (event: any) => {
        setUserData((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    }

    const submitForm = async (eventSubmit: any) => {
        eventSubmit.preventDefault();

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: userData.email,
                password: userData.password
            });

            if(error) {
                throw new Error(error.message);
            } else {
                finalizeLogin();
            }
              
        } catch(error) {
            errorAlert();
        }
    }

    const finalizeLogin = () => {
        navigateToResume();
    }

    const navigateToRegister = () => {
        return navigate('../register');
    }

    const navigateToResetPassword = () => {
        return navigate('../emailresetpassword');
    }

    const navigateToResume = () => {
        return navigate('../home');
    }

    const textToVoice = () => {
        const text: string = ptBr.loginPage_speech;
        speech.textToSpeech(text);
    }

    const errorAlert = () => {
        Swal.fire({
            icon: 'error',
            title: ptBr.loginPage_alertTitle,
            text: ptBr.loginPage_alertText,
            confirmButtonColor: '#508E92'
        }).then((result: any) => {
            if(result.isConfirmed) {
                speech.textToSpeech(ptBr.loginPage_alertText);
            }
        })
    }

    //---------------------------------------------------------------------------------------------------------------------------------

    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full signin'>
             <form 
                className='flex flex-col justify-center text-center items-center px-12 sm:px-32 lg:px-32 2xl:px-64 gap-5 sm:gap-2'
                onSubmit={submitForm}>
                    <div>
                        <span>{ptBr.loginPage_title}</span>
                        <button className='speech' onClick={textToVoice} type='button'>
                            <img src={Speech} />
                        </button>
                        <h3>{ptBr.loginPage_subTitle}</h3>
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
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Digite sua senha'
                                onValueChange={handleChange}
                            />
                            <button className='w-full absenior-button text-lg p-8 lg:p-8' type='submit'>{ptBr.confirmButton}</button>
                            <p>{ptBr.loginPage_forgotPassword} 
                                <a className='underline cursor-pointer' onClick={navigateToResetPassword}>{ptBr.loginPage_forgotPasswordLink}</a>
                            </p>
                            <p>{ptBr.loginPage_notRegistered} 
                                <a className='underline cursor-pointer' onClick={navigateToRegister}>{ptBr.loginPage_notRegisteredLink}</a>
                            </p>
                    </div>
                </form>
            <LateralLoginImage />
        </div>
    );
}