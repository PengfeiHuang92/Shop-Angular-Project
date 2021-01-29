

export class AppUser{
    constructor(name:string,email:string,isAdmin:boolean =false){}
    
    get isAdmin():boolean{
        return this.isAdmin;
    }
}