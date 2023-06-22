import React, { useEffect, useState } from 'react';
import { InputForm } from '../../components/input-form';
import { FaCheck, FaUpload} from 'react-icons/fa';
import './styles.scss'
import { useAuth } from '../../hooks/user-auth';
import { useMutation, useQuery } from 'react-query';
import { getUser, updateLoginEmail, updateUserNameEmail, uploadUserFilePic } from '../../services/users-service/users-supabase';
import { LoadingPage } from '../loading-page';
import { IUser } from '../../interfaces/user-interface.interface';
import Swal from 'sweetalert2';
import { validateEmailNotEmpty, validateNameNotEmpty } from './utils';

export default function Profile() {

  const { user }: any = useAuth();
  const [userData, setUserData] = useState({} as IUser);
  const [profilePic, setProfilePic] = useState('' as any);

  const { status, data, isLoading, refetch } = useQuery("usuarios",() => {
    return getUser(user.id);
  });

  const mutation = useMutation({
    mutationFn: ({userId, userData}: any) => {
        return updateUserNameEmail(userId, userData);
    },
    onSuccess: () => {
      refetch();
      sucessAlert();
    }
  });

  const mutationImage = useMutation({
    mutationFn: ({userId, file}: any) => {
        return uploadUserFilePic(userId, file, data.imagem.slice(73));
    },
    onSuccess: () => {
      refetch();
    }
  });

  const mutationEmail = useMutation({
    mutationFn: ({userData}: any) => {
        return updateLoginEmail(userData.email);
    }
  });

  useEffect(() => {
    if(status === 'success') {
        setUserData({
          name: data.nome,
          email: data.email,
          image: data.imagem
        } as IUser);

        setProfilePic(data.imagem);
    }
  },[status,data]);

  if(isLoading) {
    return(
      <>
          <LoadingPage fullPage={false}/>
      </>
    ); 
  }


  const handleChange = (event: any) => {
    setUserData((prevUser) => ({
        ...prevUser,
        [event.target.name]: event.target.value
    }));
  }

  const handleImageChange = (event: any) => {
    const file: string = event.target.files[0];
    setProfilePic(file);
  }


  const submitForm = (eventSubmit: any) => {
    eventSubmit.preventDefault();

    if(validateNameNotEmpty(userData.name) && validateEmailNotEmpty(userData.email)) {
      mutation.mutate({userId:user.id, userData: userData});
      mutationImage.mutate({userId: user.id, file: profilePic});
      mutationEmail.mutate({userData: userData});
    }
  }

  const sucessAlert = () => {
    const title: string = 'Sucesso';
    const text: string = 'Dados atualizados';

    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        confirmButtonColor: '#508E92'
    })
}

  return(
    <div className='w-full lg:mt-6 2xl:mt-8 min-h-full grid grid-cols-1 grid-flow-row md:grid-cols-12 card-profile content-center gap-8 2xl:gap-8'>
      <div className='md:col-span-6 lg:col-span-5 2xl:col-span-4 w-full flex flex-col justify-center items-center gap-5 upload'>
        {typeof profilePic != "string" ? <img className="object-fill h-52 lg:h-80 2xl:h-96 image-perfil rounded-lg" src={profilePic ? URL.createObjectURL(profilePic) : data.imagem}/> 
        : <img className="object-fill h-52 lg:h-80 2xl:h-96 image-perfil rounded-lg" src={data.imagem}/>}
        <label htmlFor="input-file" className='flex justify-center items-center gap-3 rounded-lg'>{React.createElement(FaUpload)} Nova foto</label>
        <input id='input-file' type='file' accept='.png, .jpg, .jpeg' onChange={handleImageChange}/>
      </div>

      <form 
        className='flex flex-col justify-start text-center items-center gap-5 sm:gap-2 md:col-span-6 lg:col-span-5'
        onSubmit={submitForm}
      >
        <div className='flex flex-col justify-center text-left items-left w-full mx-auto gap-5'>
            <InputForm
                label='Nome' 
                id='name'
                name='name'
                type='text'
                placeholder='Digite seu nome'
                onValueChange={handleChange}
                value={userData.name}
            />
            <InputForm
                label='E-mail' 
                id='email'
                name='email'
                type='email'
                placeholder='Digite seu email'
                onValueChange={handleChange}
                value={userData.email}
            />
            <button className='w-full absenior-button text-lg p-8 lg:p-8 flex gap-3 items-center justify-center' type='submit'>
              {React.createElement(FaCheck)}Salvar
            </button>
        </div>
      </form>
    </div>
  );
}