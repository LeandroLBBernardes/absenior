export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
    type: number;
    image: string;
    pontuation: number;
    insigniaCount: number;
    wordsCount: number;
    level: number;
}