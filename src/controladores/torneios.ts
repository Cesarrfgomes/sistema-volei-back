import {Request, Response} from 'express'
import { knex } from '../conexao'

export const cadastrarTorneio = async (req: Request, res: Response) => {
    const {nome, local, dataehora} = req.body

    try {

        const cadastrarTorineio = await knex("torneio").insert({nome, local, dataehora}).returning("*")

        return res.status(204).json(cadastrarTorineio)
    } catch (error) {
        console.log(error)
        return res.status(500).json({messagem: "Erro interno do servidor."})
    }
}

export const listarTorneios = async (req: Request, res: Response) =>{
    try {
        const listagem = await knex('torneio')

        return res.status(200).json(listagem)
    } catch (error) {
        return res.status(500).json({messagem: "Erro interno do servidor."})
    }
}

export const detalharTorneio = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const detalharTorneio = await knex("torneio").where({id})

        return res.status(200).json(detalharTorneio)
    } catch (error) {
        return res.status(500).json({messagem: "Erro interno do servidor."})
    }
}

export const editarTorneiro = async (req: Request, res: Response) =>{
    const {nome, local, dataehora} = req.body
    const {id} = req.params

    try {
        await knex("torneio").update({nome, local, dataehora}).where({id})

        return res.status(201).json()
    } catch (error) {
        return res.status(500).json({messagem: "Erro interno do servidor."})
    }
}

export const excluirTorneio = async(req: Request, res: Response) =>{ 
    const {id} = req.params

    try {
        await knex("torneiro").delete().where({id})

        return res.status(201).json()
    } catch (error) {
        return res.status(500).json({messagem: "Erro interno do servidor."})
    }
}