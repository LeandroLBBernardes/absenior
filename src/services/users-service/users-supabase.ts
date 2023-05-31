import { IUser } from "../../interfaces/user-interface.interface";
import { supabase } from "../supabase/supabase";

export async function insertUser(user: IUser) {
    try {
        const { error } = await supabase
        .from('usuarios')
        .insert([
            { 
                idUsuario: user.id, 
                nome: user.name,
                email: user.email 
            }
        ]);

        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}

export async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut();

        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
    
}

export async function getUser(userId: string): Promise<any> {
    try {
        const { data: usuarios, error }: any = await supabase
        .from('usuarios')
        .select('*')
        .eq('idUsuario', userId)
        .limit(1)
        .single()

        if(error) {
            throw new Error(error.message);
        }

        return usuarios;
    } catch(error) {
        console.log(error);
    }
}

export async function getWordCount(userId: string): Promise<number | null | undefined> {
    try {
        const { count, error } = await supabase
        .from('palavras_usuarios')
        .select('*', { count: 'exact', head: true })
        .eq('idUsuario', userId)

        if(error) {
            throw new Error(error.message);
        }

        return count;

    } catch(error) {
        console.log(error);
    }
}

export async function getInsigniasCount(userId: string): Promise<number | null | undefined> {
    try {
        const { count, error } = await supabase
        .from('insignias_usuarios')
        .select('*', { count: 'exact', head: true })
        .eq('idUsuario', userId)

        if(error) {
            throw new Error(error.message);
        }

        return count;

    } catch(error) {
        console.log(error);
    }
}

export async function updateUserLevel(userId: string, userLevel: number) {
    try {
        const { error } = await supabase
        .from('usuarios')
        .update({ nivel: userLevel })
        .eq('idUsuario', userId)

        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}