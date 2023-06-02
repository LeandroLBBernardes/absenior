export interface IInputForm {
    label: string;
    id: string;
    name: string;
    type: string; 
    placeholder: string;
    isDisable?: boolean;
    onValueChange: (event: any) => void;
    value?: string;
}