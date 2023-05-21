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