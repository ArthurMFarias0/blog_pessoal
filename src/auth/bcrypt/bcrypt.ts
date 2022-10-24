import { Injectable } from "@nestjs/common";
import * as bycrypt from 'bcrypt';

@Injectable()
export class Bcrypt {

    async criptografarsenha (senha: string): Promise<string> {

        let saltos = 10;
        return await bycrypt.hash(senha, saltos)
    }

    async compararSenhas (senhaBanco: string, senhaDigitada:string): Promise<boolean> {
        return bycrypt.compareSync(senhaBanco, senhaDigitada) 
    }
}