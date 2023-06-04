import './styles.scss'
import Speech from '../../assets/speech-icon.png'
import LoadingGif from '../../assets/loading-gif.gif'

import { InputForm } from '../../components/input-form'
import { LateralLoginImage } from '../../components/lateral-login-image';
import { TextToSpeech } from '../../services/voice/voice-service';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { supabase } from '../../services/supabase/supabase';
import { useState } from 'react';
import { IUser } from '../../interfaces/user-interface.interface';
import { LoadingPage } from '../loading-page';

export function EmailResetPassword() {
    const [userData, setUserData] = useState({} as IUser);
    const [loading, setLoading] = useState(false);
    const speech: TextToSpeech = new TextToSpeech();
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setUserData((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    }

    const sendEmail = async (eventSubmit: any) => {
        eventSubmit.preventDefault();
        setLoading(true);
        
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(userData.email);

            if(error)
                throw new Error(error.message); 

            sucessAlert();
        } catch(error) {
            errorAlert();
        } finally {
            setLoading(false); 
        }
    }

    const navigateToLogin = () => {
        return navigate('../login');
    }

    const voiceToText = () => {
        const text: string = `Esqueceu a senha? Digite o email para o qual gostaria de receber
                              a recuperação de senha. Ao clicar no botão você receberá por email
                              um link para cadastrar sua nova senha.`;

        speech.textToSpeech(text);
    }

    const sucessAlert = () => {
        const title: string = 'Sucesso!';
        const text: string = 'Email enviado com sucesso, confira seu email e sua caixa de spam';

        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonColor: '#508E92',
            confirmButtonText: 'Voltar para o Login'
        }).then ((result: any) => {
            if(result.isConfirmed){
                speech.textToSpeech(text);
                navigateToLogin();
            }
        });
    }

    const errorAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar email!',
            text: `Por questões de segurança, você só pode usar esse recurso a cada um  minuto, 
                   verifique também de o email é válido`,
            confirmButtonColor: '#508E92'
        })
    }

    if(loading){
        return(
            <>
                <LoadingPage />
            </>
        )  
    }

    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full'>
            <form className='flex flex-col justify-center text-left items-center px-12 sm:px-32 lg:px-32 2xl:px-64 gap-5'
            onSubmit={sendEmail}>
                <div className='text-center'>
                    <span>Esqueceu a senha?</span>
                    <button className='speech' onClick={voiceToText} type="button">
                        <img src={Speech} />
                    </button>
                </div>
                <div className='w-full text-left items-left'>
                    <InputForm
                        label='E-mail' 
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Digite seu e-mail'
                        onValueChange={handleChange}
                        isDisable={loading}
                    />
                </div>
                {!loading ? (
                    <>
                        <button className='w-full absenior-button' type='submit'>Enviar Email</button>
                        <p>Ao clicar no botão você receberá por email um link para cadastrar sua nova senha.</p>
                        <a className='underline cursor-pointer' onClick={navigateToLogin}>Voltar ao Login</a> 
                    </>
                ) : (
                    <img src={LoadingGif} className='loading' />
                )}    
            </form>
            <LateralLoginImage />
        </div>
    );
}