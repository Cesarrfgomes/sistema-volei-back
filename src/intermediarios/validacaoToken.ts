import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken'
import {knex} from '../conexao'


const senhaJwt = process.env.SENHA_JWT as string

export interface usuarioId extends JwtPayload {
    id: number;
}

export const validarToken = async (req: Request, res:Response, next: NextFunction) =>{
    const {authorization} = req.headers

    try {
        const token = authorization?.replace('Bearer ', '');

        if(!token){
            return res.status(403).json({mensagem: "Acesso negado."})
        }

        const {id} = <usuarioId>jwt.verify(token, senhaJwt)

        const usuarioLogado = await knex('usuarios').where({id}).first()

        if(!usuarioLogado){
            return res.status(403).json({mensagem: "Acesso negado."})
        }

        const {senha: _, ...usuario} = usuarioLogado

        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}