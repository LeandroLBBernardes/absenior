import Swal from "sweetalert2";
import { supabase } from "../supabase/supabase";

export async function getWord(lastWord: string, complexity: number): Promise<any> {
    const lastWorldByLevel: number = getLastWord(lastWord,complexity);

    try {
        const { data: palavra, error }: any = await supabase
        .from('palavras')
        .select('*')
        .eq('complexidade', complexity)
        .neq('imagem', null)
        .gt('idPalavra', lastWorldByLevel)
        .limit(1)
  
        if(error) {
            throw new Error(error.message);
        }
  
        return palavra;
    } catch(error) {
        console.log(error);
    }
}

function getLastWord(lastWord: string, complexity: number): number {
    const arrayIDPalavras: Array<String> = lastWord.split(',');

    return Number(arrayIDPalavras[complexity-1]);
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

export async function updatePontuationAndWord(lastWord: string, wordId: number, userId: string, pontuation: number, complexity: number): Promise<any> {
    const newUltimaPalavraAprendida: string = getNewUltimaPalavraAprendida(lastWord, wordId, complexity);
    
    try {
        const { error } = await supabase
        .from('usuarios')
        .update({ ultimaPalavraAprendida: newUltimaPalavraAprendida, pontuacao: pontuation})
        .eq('idUsuario', userId)
  
        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}

function getNewUltimaPalavraAprendida(lastWord: string, wordId: number, complexity: number): string {
    const arrayIDPalavras: Array<string> = lastWord.split(',');

    arrayIDPalavras[complexity-1] = wordId.toString();

    return arrayIDPalavras.join(',');
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
        }else {
            Swal.fire({
                title: 'Nova conquista desbloqueada!!',
                text: 'Confira na página de conquistas.',
                confirmButtonColor: '#508E92',
                timer: 2000
            });
        }
    } catch(error) {
        console.log(error);
    }
}