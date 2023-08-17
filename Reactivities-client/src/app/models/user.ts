export interface User{
    username: string;
    displayName: string;
    token: string;
    image?: string;
}


export interface UserFormValues{
    username?: string;
    displayName?: string;
    email: string;
    password: string;
}