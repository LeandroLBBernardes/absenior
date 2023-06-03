import { IInputForm } from '../../interfaces/input-form.interface';
import './styles.scss'

export function InputForm(props: IInputForm ) {
    return(
        <div>
            <label
                className='2xl:text-lg' 
                htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                name={props.name}
                className='w-full absenior-input p-4 lg:p-4 2xl:p-6 2xl:text-lg' 
                type={props.type} 
                placeholder={props.placeholder}
                autoComplete='off'
                onChange={props.onValueChange}
                disabled={props.isDisable ? props.isDisable : false}
                value={props.value ? props.value : ''}
            />
        </div>
    );
}

