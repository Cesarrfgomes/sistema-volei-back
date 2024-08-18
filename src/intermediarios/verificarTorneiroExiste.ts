import { Request, Response, NextFunction } from 'express'
import { knex } from '../conexao'


export const verificarTorneiroPorNome = async (req: Request, res: Response, next: NextFunction) => {
    const { nome } = req.body

    try {
        const torneiroExiste = await knex("torneio").where({ nome }).first()

        if (torneiroExiste) {
            return res.status(400).json({ mensagem: "Um torneio com este nome já existe!" })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

export const verificarTorneiroPorID = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const torneiroExistePorId = await knex("torneio").where({ id }).first()

        if (!torneiroExistePorId) {
            return res.status(400).json({ mensagem: "O torneio informado não existe!" })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}
