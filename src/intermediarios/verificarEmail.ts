import {Request, Response, NextFunction} from 'express'
import { knex } from '../conexao'


export const verificarEmailEmUso = async (req: Request, res: Response, next: NextFunction) =>{
    const {email} = req.body

    try {
        const verificarEmail = await knex("usuarios").where({email}).first()

        if(verificarEmail){
            return res.status(400).json({mensagem: "Este email já está em uso."})
        }

        next()
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}
