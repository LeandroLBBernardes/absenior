import './styles.scss'
import Speech from '../../assets/speech-icon.png'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom';

import { IUser } from '../../interfaces/user-interface.interface';
import { useState } from 'react';
import { useAuth } from '../../hooks/user-auth';
import { supabase } from '../../services/supabase/supabase';
import Logo from '../../assets/image-login.png'
import { TextToSpeech } from '../../services/voice/voice-service';

export function Register() {
    const [dataUser, setDataUser] = useState({} as IUser);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setDataUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    }

    const submitForm = async (eventSubmit: any) => {
        eventSubmit.preventDefault();

        let { data, error } = await supabase.auth.signUp({
            email: dataUser.email,
            password: dataUser.password
        })

        if(error)
            errorAlert();
        else{
            sucessAlert();
            setUser(data);
        }
            
    }

    const navigateToSignIn = () => {
        return navigate('../login');
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
                            <div>
                                <label htmlFor='name'>Nome</label>
                                <input
                                    id='name'
                                    name='name'
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='text' 
                                    placeholder='Digite seu nome'
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <label htmlFor='email'>E-mail</label>
                                <input
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
                                <label htmlFor='school'>Escola</label>
                                <input
                                    id='school'
                                    name='school' 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='text' 
                                    placeholder='Digite sua escola'
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <label htmlFor='password'>Senha</label>
                                <input
                                    id='password'
                                    name='password' 
                                    className='w-full absenior-input p-4 lg:p-4' 
                                    type='password' 
                                    placeholder='Digite sua senha'
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </div>
                            <button className='w-full absenior-button text-lg p-8 lg:p-8'>Confirmar</button>
                            <p>Já possui uma conta? 
                                <a className='underline cursor-pointer' onClick={navigateToSignIn}>Entrar</a>
                            </p>
                    </div>
            </form>
            <div className='hidden lg:block'>
            <img className='w-full h-screen object-cover' src={Logo} />
        </div>
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
    })
}