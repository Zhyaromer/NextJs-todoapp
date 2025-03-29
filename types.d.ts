export interface Todo {
    id?: number;
    userid: string;
    task: string;
    complete: boolean;
}

export type Users = {
    name: string;
    email: string;
    img?: string;
    providerid?: string;
    provider?: string;
    password?: string;
};