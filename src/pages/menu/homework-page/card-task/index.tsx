import React from 'react';
import './styles.scss'
import { ImVolumeHigh } from 'react-icons/im';
import { TextToSpeech } from '../../../../services/voice/voice-service';
import Swal from 'sweetalert2';
import { deleteTask } from '../../../../services/tasks-service/tasks-supabase';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

type TaskCardProps = {
  userType: number;
  userId: string;
  taskId: number;
  title: string;
  refetchRequest: () => void;
}

export function TaskCard(props: TaskCardProps) {
  const speech: TextToSpeech = new TextToSpeech();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({taskId}: any) => {
        return deleteTask(taskId);
    },
    onSuccess: () => {
      setTimeout(() => {
        props.refetchRequest();
      }, 300)
    }
  });

  let list: Array<number> = [];

  const navigateTo = (): any => {
    if(list.length == 0) {
      navigate(`../../home/visualizehomework?idTask=${props.taskId}`);
    }

    list = [];    
  }

  const textToSpeech = (text: string) => {
    list.push(1);
    speech.textToSpeech(text);
  }

  const deleteCard = () => {
    mutation.mutate({taskId: props.taskId});
  }


  const alertDeleteCard = () => {
    list.push(1);
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Se deletar não tem como voltar atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero deletar!',
      cancelButtonText: 'Não, não quero deletar.'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCard();
        Swal.fire(
          'Deletado!',
          'Tarefa deletada com sucesso',
          'success'
        )
      }
    })
  }

  return(
    <div className='task-card rounded-xl p-5 flex flex-col gap-5' onClick={navigateTo}>
      <div className='flex justify-start'>
        <div className='type-task rounded-full py-1 px-5'>Para Casa</div>
      </div>

      <div className='flex gap-3 items-center title-homework'>
        <h1>{props.title}</h1>
        <span onClick={() => textToSpeech(props.title)}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
      </div>

      <div className={`flex justify-end gap-3 ${props.userType == 2 && 'hidden'}`}>
        <button className='absenior-button w-28 del-button' onClick={alertDeleteCard}>Deletar</button>
      </div>
    </div>
  );
}