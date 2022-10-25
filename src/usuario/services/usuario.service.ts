import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {
   constructor(
    @InjectRepository(Usuario)
    private usuarioReporsitory: Repository<Usuario>,
    private bcrypt: Bcrypt 
   ) {}

    async findByUsuario (usuario: string): Promise<Usuario> {
        return await this.usuarioReporsitory.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll (): Promise<Usuario[]> {
        return await this.usuarioReporsitory.find({
            relations: {
                postagem: true
            }
        })
    }

    async findById (id: number): Promise<Usuario> {
        let buscaUsuario = await this.usuarioReporsitory.findOne ({
            where: {
                id
            },
            relations: {
                postagem: true
            }
       })

       if(!buscaUsuario)
        throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)
       return buscaUsuario;
    }

    async create (usuario: Usuario): Promise<Usuario> {
        let buscaUsuario = await this.findByUsuario(usuario.usuario)

        if (!buscaUsuario){
        usuario.senha = await this.bcrypt.criptografarsenha(usuario.usuario)
        return await this.usuarioReporsitory.save(usuario);
        }

        throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST)
    }


    async update (usuario: Usuario): Promise<Usuario> {
        let updateUsuario: Usuario = await this.findById(usuario.id)
        let buscaUsuario = await this.findByUsuario(usuario.usuario)

        if (!updateUsuario)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);

        if (buscaUsuario && buscaUsuario.id != usuario.id)
            throw new HttpException('Usuário (e-mail) já cadastrado',HttpStatus.BAD_REQUEST);
        
        usuario.senha = await this.bcrypt.criptografarsenha(usuario.senha);
        return await this.usuarioReporsitory.save(usuario);
    }
}