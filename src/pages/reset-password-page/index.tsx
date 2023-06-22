import './styles.scss'

import Speech from '../../assets/speech-icon.png'

import { useState } from 'react';
import { TextToSpeech } from '../../services/voice/voice-service';
import { IUser } from '../../interfaces/user-interface.interface';
import { useNavigate, useSearchParams} from 'react-router-dom';
import { supabase } from '../../services/supabase/supabase';
import Swal from 'sweetalert2';
import { InputForm } from '../../components/input-form';
import { LateralLoginImage } from '../../components/lateral-login-image';
import { logoutUser } from '../../services/users-service/users-supabase';

export default function ResetPassword() {
    const [userData, setUserData] = useState({} as IUser);
    const [searchParams] = useSearchParams();
    const speech: TextToSpeech = new TextToSpeech();
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setUserData((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    }

    const updateUser = (eventSubmit: any) => {
        eventSubmit.preventDefault();

        if(userData.password === userData.confirmpassword 
        && userData.password.length >= 6) {
            verifyOTP();
        } else {
            errorAlert(`Senhas não compatíveis! As senhas devem 
            ser iguais e possuir um tamanho maior ou igual a 6 caracteres`);
        }
    }

    const verifyOTP = async () => {
        try {
            const { error } = await supabase.auth.verifyOtp({
                email: searchParams.get("email") as string,
                token: searchParams.get("token") as string,
                type: 'recovery'
            })

            if(error) {
                throw new Error(error.message);
            }else {
                updatePassword();
            }
        } catch(error) {
            errorAlert('Certifique se o usuário está cadastrado!');
        }
    }

    const updatePassword = async () => {
        try {
            const { error } = await supabase.auth.updateUser({
                password: userData.password
            })

            if(error) {
                throw new Error(error.message);
            }else {
                logoutUser();
                sucessAlert();
            }
        } catch (error) {
            errorAlert('Algo deu errado, certifique que está tudo correto');
        }
    }

    const sucessAlert = () => {
        const title: string = 'Sucesso!';
        const text: string = 'Senha recuperada';

        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonColor: '#508E92'
        }).then ((result: any) => {
            if(result.isConfirmed){
                speech.textToSpeech(text);
                navigateToLogin();
            }
        });
    }

    const navigateToLogin = () => {
        return navigate('../login');
    }

    const errorAlert = (text: string) => {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao recuperar a senha!',
            text: text,
            confirmButtonColor: '#508E92'
        })
    }

    const voiceToText = () => {
        const text: string = `Recuperar senha! Nos espaços abaixo digite 
                              sua senha duas vezes e clique em confirmar`;

        speech.textToSpeech(text);
    }


    return(
        <div className='recover grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full'>
            <form className='flex flex-col justify-center text-left items-center px-12 sm:px-32 lg:px-32 2xl:px-64 gap-5'
            onSubmit={updateUser}>
                <div className='text-center'>
                    <span>Recuperar Senha</span>
                    <button className='speech' onClick={voiceToText} type='button'>
                        <img src={Speech} />
                    </button>
                </div>
                <div className='flex flex-col w-full text-left items-left gap-5'>
                    <InputForm
                        label='Senha' 
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Digite sua nova senha'
                        onValueChange={handleChange}
                    />
                    <InputForm
                        label='Confirmar senha' 
                        id='confirmpassword'
                        name='confirmpassword'
                        type='password'
                        placeholder='Confirme sua nova senha'
                        onValueChange={handleChange}
                    />
                </div>
                <button className='w-full absenior-button' type='submit'>Atualizar Senha</button>
                <p className='underline cursor-pointer' onClick={navigateToLogin}>Voltar ao Login</p>
            </form>
            <LateralLoginImage />
        </div>
    );
}