import { useQuery } from 'react-query';
import './styles.scss'
import { getTask } from '../../../../services/tasks-service/tasks-supabase';
import { LoadingPage } from '../../../loading-page';
import { HeaderMenuPageComponent } from '../../../../components/header-menu-pages';
import { SpeechButton } from '../../../../components/speech-button';

export default function VisualizeTask() {
  const searchParams: any = new URLSearchParams(document.location.search);

  if(!searchParams.get('idTask')) {
    return(
      <div className="grid grid-cols-1 h-screen w-full error-page">
          <div className="flex flex-col justify-center text-center">
              <h1>TAREFA NÃO ENCONTRADA!</h1>
          </div>
      </div>
    );
  }

  const { data, isLoading, error } = useQuery("visualizar-tarefas",() => {
    return getTask(searchParams.get('idTask'));
  })

  if(isLoading) {
    return(
      <LoadingPage />
    );
  }

  if(error) {
    return(
      <div className="grid grid-cols-1 h-screen w-full error-page">
          <div className="flex flex-col justify-center text-center">
              <h1>TAREFA NÃO ENCONTRADA!</h1>
          </div>
      </div>
    );
  }


  return(
    <div className='w-full min-h-screen p-5'> 
       <div className='bg-white w-full h-full rounded-3xl practice-card flex flex-col p-5 md:pt-0 md:px-8 lg:px-10 lg:pt-0 gap-3'>
          <HeaderMenuPageComponent 
              title="Para Casa"
              path='../../home/homework'
          />

          <hr />

          <div className='flex flex-col gap-8 mt-5'>
            <div className='flex gap-2 items-center'>
              <h1 className='text-3xl'>{data[0].enunciado}</h1>
              <SpeechButton 
                text={`${data[0].enunciado}  ${data[0].comando}`}
              />
            </div>
            <span className='text-2xl font-medium text-justify'>
              {data[0].comando}
            </span>
            <hr />
            <div className={`flex gap-3 items-center ${!data[0].alternativaA && 'hidden'}`}>
              <span className='text-2xl'>A)</span>
              <SpeechButton 
                text={`Letra A: ${data[0].alternativaA}`}
              />
              <span className='text-2xl font-medium text-justify'>{data[0].alternativaA}</span>
            </div>
            <div className={`flex gap-3 items-center ${!data[0].alternativaB && 'hidden'}`}>
              <span className='text-2xl'>B)</span>
              <SpeechButton 
                text={`Letra B: ${data[0].alternativaB}`}
              />
              <span className='text-2xl font-medium text-justify'>{data[0].alternativaB}</span>
            </div>
            <div className={`flex gap-3 items-center ${!data[0].alternativaC && 'hidden'}`}>
              <span className='text-2xl'>C)</span>
              <SpeechButton 
                text={`Letra C: ${data[0].alternativaC}`}
              />
              <span className='text-2xl font-medium text-justify'>{data[0].alternativaC}</span>
            </div>
            <div className={`flex gap-3 items-center ${!data[0].alternativaD && 'hidden'}`}>
              <span className='text-2xl'>D)</span>
              <SpeechButton 
                text={`Letra D: ${data[0].alternativaD}`}
              />
              <span className='text-2xl font-medium text-justify'>{data[0].alternativaD}</span>
            </div>
            
          </div>
        
        </div>
    </div>
  );
}