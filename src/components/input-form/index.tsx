import { IInputForm } from '../../interfaces/input-form.interface';
import './styles.scss'

export function InputForm(props: IInputForm ) {
    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                name={props.name}
                className='w-full absenior-input p-4 lg:p-4' 
                type={props.type} 
                placeholder={props.placeholder}
                autoComplete='off'
                onChange={props.onValueChange}
            />
        </div>
    );
}

