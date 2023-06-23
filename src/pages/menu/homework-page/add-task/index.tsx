import { useMutation, useQuery } from 'react-query';
import { useAuth } from '../../../../hooks/user-auth'
import './styles.scss'
import { getUser } from '../../../../services/users-service/users-supabase';
import { LoadingPage } from '../../../loading-page';
import { useNavigate } from 'react-router-dom';
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { insertTask } from '../../../../services/tasks-service/tasks-supabase';

export default function AddTask() {
  const { user }: any = useAuth();
  const [dataTask, setDataTask] = useState({} as any);
  const [hasSubmit, setHasSubmit] = useState(false);
  const navigate = useNavigate();

  const {data, isLoading} = useQuery("usuarios-add-tarefa",() => {
    return getUser(user.id);
  });

  const mutationInsert = useMutation({
    mutationFn: ({userId}: any) => {
        return insertTask(userId, dataTask);
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Tarefa cadastrada com sucesso.',
        confirmButtonColor: '#508E92'
      });
    }
});

  if(isLoading) {
    return(
      <LoadingPage />
    )
  }

  if(data.tipo == 2) {
    navigate('../../home/menu');
  }

  const handleChange = (event: any) => {
    setHasSubmit(false);
    setDataTask((prevUser: any) => ({
        ...prevUser,
        [event.target.name]: event.target.value
    }));
  }

  const submitTask = (eventSubmit: any) => {
    eventSubmit.preventDefault();

    if(validate()) {
      mutationInsert.mutate({userId: user.id});
      setDataTask({} as any);
      setHasSubmit(true);
    }
  }

  const validate = (): boolean => {
    if((dataTask.enunciado == '' || dataTask.enunciado == undefined)  
    || (dataTask.comando == '' || dataTask.comando == undefined)) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar!',
        text: 'Título e comando não podem ser vazio',
        confirmButtonColor: '#508E92'
      });

      return false;
    }

    return true;
  }

  return(
    <div className='add-homework-page w-full min-h-screen p-5'> 
       <div className='bg-white w-full h-full rounded-3xl add-homework-card flex flex-col p-5 md:pt-0 md:px-5 lg:px-10 lg:pt-0 gap-3'>
          <HeaderMenuPageComponent 
              title="Adicionar tarefa"
              path='../../home/homework'
          />

          <form className='flex flex-col gap-5 w-full h-full' onSubmit={submitTask}>
            <div className='flex flex-col gap-2'>
              <label htmlFor='enunciado' className='text-lg'>Título: </label>
              <textarea
                id='enunciado'
                name='enunciado'
                className=''
                placeholder='Digite o título da tarefa'
                onChange={handleChange}
                value={hasSubmit ? '' : dataTask.enunciado}
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='comando' className='text-lg'>Comando: </label>
              <textarea
                id='comando'
                name='comando'
                className='h-64'
                placeholder='Digite o comando'
                onChange={handleChange}
                value={hasSubmit ? '' : dataTask.comando}
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='letra-a' className='text-lg'>Letra A: </label>
              <textarea
                id='letra-a'
                name='alternativaA'
                placeholder='Digite a letra A'
                onChange={handleChange}
                value={hasSubmit ? '' : dataTask.alternativaA}
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='letra-b' className='text-lg'>Letra B: </label>
              <textarea
                id='letra-b'
                name='alternativaB'
                placeholder='Digite a letra B'
                onChange={handleChange}
                value={hasSubmit ? '' : dataTask.alternativaB}
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='letra-c' className='text-lg'>Letra C: </label>
              <textarea
                id='letra-c'
                name='alternativaC'
                placeholder='Digite a letra C'
                onChange={handleChange}
                value={hasSubmit ? '' : dataTask.alternativaC}
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='letra-d' className='text-lg'>Letra D: </label>
              <textarea
                id='letra-d'
                name='alternativaD'
                placeholder='Digite a letra D'
                onChange={handleChange}
                value={hasSubmit ? '' : dataTask.alternativaD}
              ></textarea>
            </div>

            <div className='flex justify-end'>
              <button className='absenior-button' type='submit'>Adicionar Nova Tarefa</button>
            </div>
          </form>

        </div>
    </div>
  );
}