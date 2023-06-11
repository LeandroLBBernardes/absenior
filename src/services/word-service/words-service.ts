import { supabase } from "../supabase/supabase";

export async function getWord(lastWord: number, complexity: number): Promise<any> {
    try {
        const { data: palavra, error }: any = await supabase
        .from('palavras')
        .select('*')
        .eq('complexidade', complexity)
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