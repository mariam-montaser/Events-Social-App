import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";



export default class CommonStore{
    error: ServerError | null = null;
    token: string | null = localStorage.getItem('token');
    appLoaded = false;

    constructor(){
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if(token){
                    localStorage.setItem('token', token)
                } else {
                    localStorage.removeItem('token')
                }
            }
        )
    }

    setServerError(error: ServerError){
        this.error = error;
    }

    setToken(token:string |null){
        this.token = token;
    }

    setAppLoaded(){
        this.appLoaded = true;
    }
}