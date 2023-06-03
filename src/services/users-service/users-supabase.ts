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

export async function updateUserNameEmail(userId: string, user: IUser) {
    try {
        const { error } = await supabase
        .from('usuarios')
        .update({nome: user.name, email: user.email})
        .eq('idUsuario', userId)

        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}

export async function uploadUserFilePic(userId: string, file: any, lastFileName: string) {
    if((typeof file == 'string' && lastFileName != file.slice(73)) 
     || typeof file != 'string' && lastFileName != file.name)
        deleUserImage(userId, file, lastFileName);
}

async function updateExistFile(userId: string, file: any) {
    try {
        const { error } = await supabase
        .storage
        .from('images')
        .update(userId+"/",file)
        

        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}

async function updateUserImage(userId: string, path: string) {
    try {
        const { error } = await supabase
        .from('usuarios')
        .update({imagem: `https://tgxaowsodjjnuyqaswdp.supabase.co/storage/v1/object/public/images/${path}`})
        .eq('idUsuario', userId)

        if(error) {
            throw new Error(error.message);
        }
    } catch(error) {
        console.log(error);
    }
}

async function deleUserImage(userId: string, newFile: any, fileName: string) {
    if(fileName.includes(userId) && !fileName.includes('undefined')) {
        try {
            const {error} = await supabase
            .storage
            .from('images')
            .remove([fileName])
    
            if(error) {
                throw new Error(error.message);
            } else {
                uploadNewFile(userId,newFile);
            }
    
        } catch(error) {
            console.log(error);
        }
    } else {
        uploadNewFile(userId,newFile);
    }
}

async function uploadNewFile(userId: string, file: any) {
    try {
        const { data, error } = await supabase
        .storage
        .from('images')
        .upload(userId+"/"+file.name,file)

        if(error) {
            throw new Error(error.message);
        } else { 
            updateUserImage(userId, data.path);
        }
    } catch(error) {
        updateExistFile(userId, file);
    }
}