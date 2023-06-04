import React, { useState } from 'react';
import { InputForm } from '../../components/input-form';
import './styles.scss'
import { FaCheck } from 'react-icons/fa'
import { useMutation } from 'react-query';
import { updateLoginPassword } from '../../services/users-service/users-supabase';
import { sucessAlert, validateLengthPassword, validateSamePassword } from './utils';

export function ChangePassword() {
  const [userData, setUserData] = useState({} as {password: string, confirmPassword: string});

  const mutation = useMutation({
    mutationFn: ({userData}: any) => {
        return updateLoginPassword(userData.password);
    },
    onSuccess: () => {
      setUserData({password: '', confirmPassword: ''});
      sucessAlert();
    }
  });

  const handleChange = (event: any) => {
    setUserData((prevUser) => ({
        ...prevUser,
        [event.target.name]: event.target.value
    }));
  }

  const submitForm = (eventSubmit: any) => {
    eventSubmit.preventDefault();

    if(validateSamePassword(userData.password, userData.confirmPassword) && validateLengthPassword(userData.password)) {
      mutation.mutate({userData: userData});
    }
  }

  return(
    <div className='lg:mt-6 grid grid-cols-11 w-full settings-change-password'>
      <div className='col-span-full md:col-start-4 md:col-span-5 gap-5'>
      <form 
        className='flex flex-col gap-5'
        onSubmit={submitForm}
      >
          <InputForm
              label='Nova senha' 
              id='password'
              name='password'
              type='password'
              placeholder='Digite sua nova senha'
              onValueChange={handleChange}
              value={userData.password}
          />
          <InputForm
              label='Confirmar nova senha' 
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirme sua nova senha'
              onValueChange={handleChange}
              value={userData.confirmPassword}
          />
          <button className='w-full absenior-button text-lg p-8 lg:p-8 flex gap-3 items-center justify-center' type='submit'>
              {React.createElement(FaCheck)}Alterar Senha
            </button>
        </form>
      </div>
    </div>
    
  );
}