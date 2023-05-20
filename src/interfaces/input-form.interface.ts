export interface IInputForm {
    label: string;
    id: string;
    name: string;
    type: string; 
    placeholder: string;
    onValueChange: (event: any) => void;
}