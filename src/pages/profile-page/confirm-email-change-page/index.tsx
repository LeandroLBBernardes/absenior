import React, { useEffect } from 'react';
import './styles.scss'
import {FaCheckCircle} from 'react-icons/fa'
import { useAuth } from '../../../hooks/user-auth';
import { updateUserEmail } from '../../../services/users-service/users-supabase';

export default function ConfirmEmailChange() {
  const { user }: any = useAuth();
  
  useEffect(() => {
    updateUserEmail(user.id, user.email);

    setTimeout(() => {
      window.close();
    }, 3000)
  },[])

  return(
    <div className="w-full h-screen flex flex-col justify-center text-center items-center change-email gap-8">
      {React.createElement(FaCheckCircle,{size:120})}
      <h1>Troca de email Confirmada...</h1>
    </div>
  );
}