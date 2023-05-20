import './styles.scss'
import Speech from '../../assets/speech-icon.png'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom';

import { IUser } from '../../interfaces/user-interface.interface';
import { useState } from 'react';
import { supabase } from '../../services/supabase/supabase';
import { TextToSpeech } from '../../services/voice/voice-service';
import { InputForm } from '../../components/input-form';
import { LateralLoginImage } from '../../components/lateral-login-image';

export function Register() {
    const [dataUser, setDataUser] = useState({} as IUser);
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setDataUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    }

    const submitForm = async (eventSubmit: any) => {
        eventSubmit.preventDefault();

        let { error } = await supabase.auth.signUp({
            email: dataUser.email,
            password: dataUser.password
        })

        if(error)
            errorAlert();
        else{
            sucessAlert();
            navigateToResume();
        }
            
    }

    const navigateToSignIn = () => {
        return navigate('../login');
    }

    const navigateToResume = () => {
        return navigate('../home');
    }

    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full register'>
             <form 
                className='flex flex-col justify-center text-center items-center px-12 py-8 lg:py-0 sm:px-32 lg:px-32 2xl:px-64 gap-5 sm:gap-2'
                onSubmit={submitForm}>
                    <div>
                        <span>Cadastro</span>
                        <button className='speech' onClick={textToVoice} type='button'>
                            <img src={Speech} />
                        </button>
                        <h3>Informe seus dados.</h3>
                    </div>
                    <div className='flex flex-col justify-center text-left items-left w-full mx-auto gap-5'>
                            <InputForm
                                label='Nome' 
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Digite seu nome'
                                onValueChange={handleChange}
                            />
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
                            <button className='w-full absenior-button text-lg p-8 lg:p-8'>Confirmar</button>
                            <p>Já possui uma conta? 
                                <a className='underline cursor-pointer' onClick={navigateToSignIn}>Entrar</a>
                            </p>
                    </div>
            </form>
            <LateralLoginImage />
        </div>
    );
}

function textToVoice(): void {
    const speech: TextToSpeech = new TextToSpeech();
    const text: string = 'Cadastrar! Nos espaços abaixo digite seu nome, seu e-mail, sua escola e sua senha, depois clique em confirmar!';

    speech.textToSpeech(text);
}

function errorAlert(): void {
    Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar!',
        text: 'Usuário já cadastrado',
        confirmButtonColor: '#508E92'
    })
}

function sucessAlert(): void {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Seu cadastro foi realizado com sucesso',
        confirmButtonColor: '#508E92'
    });
}