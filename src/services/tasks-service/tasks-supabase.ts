import { supabase } from "../supabase/supabase";

export async function getAllTasks(): Promise<any> {
  try {
      const { data: tarefas, error }: any = await supabase
      .from('tarefas')
      .select('*')

      if(error) {
          throw new Error(error.message);
      }

      return tarefas;
  } catch(error) {
      console.log(error);
  }
}

export async function getTask(idTask: number): Promise<any> {
    try {
        const { data: tarefas, error }: any = await supabase
        .from('tarefas')
        .select('*')
        .eq('idTarefa', `${idTask}`)
  
        if(error) {
            throw new Error(error.message);
        }
  
        return tarefas;
    } catch(error) {
        console.log(error);
    }
  }

export async function deleteTask(taskId: number): Promise<any> {
    try {
        const { error } = await supabase
        .from('tarefas')
        .delete()
        .eq('idTarefa', taskId)
  
        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}

export async function insertTask(userId: string, task: any): Promise<any> {
    try {
        const { error } = await supabase
        .from('tarefas')
        .insert([
            { 
                idUsuario: userId,
                enunciado: task.enunciado, 
                comando: task.comando,
                alternativaA: task.alternativaA,
                alternativaB: task.alternativaB,
                alternativaC: task.alternativaC,
                alternativaD: task.alternativaD 
            },
        ])
  
        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}