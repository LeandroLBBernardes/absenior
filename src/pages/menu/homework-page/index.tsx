import { useQuery } from 'react-query';
import { HeaderMenuPageComponent } from '../../../components/header-menu-pages';
import './styles.scss'
import { getUser } from '../../../services/users-service/users-supabase';
import { useAuth } from '../../../hooks/user-auth';
import { LoadingPage } from '../../loading-page';
import { FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { TaskCard } from './card-task';
import { getAllTasks } from '../../../services/tasks-service/tasks-supabase';
import { useNavigate } from 'react-router-dom';

export default function HomeWorkPage() {
  const { user }: any = useAuth();
  const [tasksList, setTaskLists] = useState([] as Array<any>);
  const [searchTasksList, setSearchTaskLists] = useState([] as Array<any>);
  const [search,setSearch] = useState('');
  const navigate = useNavigate();
 
  let searchArray: Array<any> = [];

  const {data, isLoading} = useQuery("usuarios-tarefas",() => {
    return getUser(user.id);
  });

  const {status: statusTasks, data: allTasks, isLoading: isLoadingTasks, refetch} = useQuery("tarefas",() => {
    return getAllTasks();
  })

  useEffect(() => {
    if(statusTasks == 'success') {
      setTaskLists(allTasks);
    }
  },[statusTasks,allTasks]);

  if(isLoading || isLoadingTasks) {
    return(
      <LoadingPage />
    )
  }

  const handleChange = (event: any) => {
    const result: any = tasksList.filter(x => x.enunciado.includes(event.target.value));
    searchArray = result;
      
    setSearch(event.target.value);
    setSearchTaskLists(result ? searchArray : [] as Array<any>);

    if(event.target.value == '') {
      setSearchTaskLists([]);
      searchArray = [];
    }
  }

  const submitSearch = (eventSubmit: any) => {
    eventSubmit.preventDefault();
    const result: any = tasksList.find(x => x.descricao == search);

    searchArray = [...searchArray,result];
    setSearchTaskLists(result ? searchArray : [] as Array<any>);
    searchArray = [];
  }

  const navigateToAddTask = () => {
    navigate('../addtask')
  }


  return(
    <div className='homework-page w-full min-h-screen p-5'> 
       <div className='bg-white w-full h-full rounded-3xl homework-page-card flex flex-col p-5 md:pt-0 md:px-5 lg:px-10 lg:pt-0 gap-3'>
          <HeaderMenuPageComponent 
              title="Tarefas"
          />

          <div className='flex flex-col md:flex-row gap-5'>
            <div className='w-full'>

              <form className="search-form w-full h-full" onSubmit={submitSearch}>
                <div className="relative">
                  <input type='text' className='w-full' placeholder='Digite o título da tarefa' onChange={handleChange}/>
                  <button type="submit" className="px-2 text-black absolute right-0.5 bottom-3 bg-white text-sm">
                    {React.createElement(FaSearch, { size: "16"})}
                  </button>
                </div>
              </form>

            </div>
            <button className={`w-full md:w-36 py-2 rounded-lg new-task-button ${data.tipo == 2 && 'hidden'}`} onClick={navigateToAddTask}>
              Nova Tarefa
            </button>
          </div>

          <div className='h-full mt-3 flex flex-col gap-5'>
            {search != ''
            ? searchTasksList?.map((task,index) => (
              <TaskCard
                key={index}
                userId={user.id}
                taskId={task.idTarefa}
                userType={data.tipo}
                title={task.enunciado}
                refetchRequest={() => refetch()}
              />
            ))
            : tasksList?.map((task,index) => (
              <TaskCard
                key={index}
                userId={user.id}
                taskId={task.idTarefa}
                userType={data.tipo}
                title={task.enunciado}
                refetchRequest={() => refetch()}
              />
            ))
          }
          </div>
        </div>
    </div>
  );
}