import { Token } from "@angular/compiler/src/ml_parser/lexer";

export class User {
    constructor(u,r){
        this.username=u
        this.role=r
        

    }
    username: string;
    role: string;
    token: Token;
}
