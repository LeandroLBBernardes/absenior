import { supabase } from "../supabase/supabase";

export async function getWord(lastWord: number, complexity: number): Promise<any> {
    try {
        const { data: palavra, error }: any = await supabase
        .from('palavras')
        .select('*')
        .eq('complexidade', complexity)
        .neq('imagem', null)
        .gt('idPalavra', lastWord)
        .limit(1)
  
        if(error) {
            throw new Error(error.message);
        }
  
        return palavra;
    } catch(error) {
        console.log(error);
    }
}

export async function insertuserWord(wordId: number, userId: string): Promise<any> {
    try {
        const { data, error: errorGet } = await supabase
        .from('palavras_usuarios')
        .select('*')
        .eq('idPalavra',wordId)

        if(errorGet) {
            throw new Error(errorGet.message);
        }else if (data.length == 0) {
            const { error } = await supabase
            .from('palavras_usuarios')
            .insert([
                { 
                    idPalavra: wordId, 
                    idUsuario: userId 
                }
            ])
      
            if(error) {
                throw new Error(error.message);
            }
        }
    } catch(error) {
        console.log(error);
    }
}

export async function updatePontuationAndWord(wordId: number, userId: string, pontuation: number): Promise<any> {
    try {
        const { error } = await supabase
        .from('usuarios')
        .update({ ultimaPalavraAprendida: wordId, pontuacao: pontuation})
        .eq('idUsuario', userId)
  
        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}

export async function getInsignia(pontuation: number, userId: string): Promise<any> {
    try {
        const { data, error }: any = await supabase
        .from('insignias')
        .select('idInsignia')
        .eq('pontuacao', pontuation)
  
        if(error) {
            throw new Error(error.message);
        }else {
            insertInsignia(userId, data[0].idInsignia);
        }
    } catch(error) {
        console.log(error);
    }
}

export async function insertInsignia(userId: string, idInsignia: number): Promise<any> {
    try {
        const { error } = await supabase
        .from('insignias_usuarios')
        .insert([
            { idUsuario: userId, idInsignia: idInsignia },
        ])
  
        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}