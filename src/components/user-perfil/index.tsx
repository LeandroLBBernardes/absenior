import './styles.scss'
import SeniorChair from '../../assets/img-senior-chair.png'

export function UserPerfil() {
    return(
        <div className='user-perfil flex flex-row gap-2 justify-center'>
            <img className="object-scale-down h-10 w-10 rounded-full" src={SeniorChair}/>
            <span className='flex flex-col justify-center'>Sebastião Silva</span>
        </div>
    );
}