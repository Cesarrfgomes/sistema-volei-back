import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { knex } from '../conexao'
import bcrypt from 'bcrypt'

const senhaJwt = process.env.SENHA_JWT as string

export const login = async(req: Request, res: Response) =>{
    const {email, senha} = req.body

    try {
        const emailExiste = await knex('usuarios').where({email}).first()

        const senhaCorreta = await bcrypt.compare(senha, emailExiste.senha)

        if(!emailExiste){
            return res.status(403).json({mensagem: "As credenciais não coincidem."})
        }

        if(!senhaCorreta){
            return res.status(403).json({mensagem: "As credenciais não coincidem."})
        }

        const token = jwt.sign({id: emailExiste.id}, senhaJwt, {expiresIn: '8h'})

        const {senha: _, ...usuario} = emailExiste

        if(usuario.cargo === "ALUNO"){
            usuario.cargo = 10
        }

        
        if(usuario.cargo === "TUTOR"){
            usuario.cargo = 11
        }

        
        if(usuario.cargo === "ADMINISTRADOR"){
            usuario.cargo = 12
        }

        return res.status(200).json({usuario,token})
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}