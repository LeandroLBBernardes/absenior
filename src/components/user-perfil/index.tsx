import './styles.scss'
import { useQuery } from 'react-query';
import { getUser } from '../../services/users-service/users-supabase';
import { useAuth } from '../../hooks/user-auth';
import { LoadingAnimation } from '../loading-animation';
import { useNavigate } from 'react-router-dom';

export function UserPerfil() {
    const { user }: any = useAuth();
    const navigate = useNavigate();

    const { data, isLoading, error} = useQuery("usuarios",() => {
        return getUser(user.id);
    });

    if(isLoading) {
        return(
            <div className='user-perfil flex flex-row gap-2 justify-center'>
                <div className='animation'><LoadingAnimation /></div>
                <span className='flex flex-col justify-center'>Carregando...</span>
            </div>
        );
    }

    if(error) {
        return(
            <div className='user-perfil flex flex-row gap-2 justify-center'>
                <div className='animation'><LoadingAnimation /></div>
                <span className='flex flex-col justify-center'>ERRO!</span>
            </div>
        );
    }

    return(
        <div
            onClick={() => navigate('../../home/settings')} 
            className='user-perfil flex flex-row gap-2 justify-center'>
            <img className="object-fill h-8 w-8 rounded-full" src={data.imagem}/>
            <span className='flex flex-col justify-center'>{data.nome}</span>
        </div>
    );
}