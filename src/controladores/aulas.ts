import {Request, Response} from 'express'
import { knex } from '../conexao'


export const cadastrarAula = async (req: Request, res: Response) =>{
    const {data, local} = req.body
    const {usuario} = req

    if(usuario.cargo < 11){
        return res.status(403).json({mensagem: "Não autorizado."})
    }

    try {

        if(!data){
            return res.status(400).json({mensagem: "A data é obrigatória!"})
        }

        if(!local){
            return res.status(400).json({mensagem: "O local é obrigatório!"})
        }

        const cadastrarAula= await knex('aulas')
        .insert({tutor_id: usuario.id, data, local})
        .returning('*')

        return res.status(201).json(cadastrarAula)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro iterno do servidor."})
    }
}

export const editarAula = async (req: Request, res: Response) =>{
    const {data, local, tutor_id} = req.body
    const {id} = req.params

    try {
        const aula = await knex('aulas').where({id}).first()

        if(!aula){
            return res.status(404).json({mensagem: "Aula não encontrada."})
        }

        await knex('aulas').update({data, local, tutor_id}).where({id})

        return res.status(204).json({mensagem: "Aula atualizada com sucesso."})
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const inscricaoAula = async (req: Request, res: Response) => {
    const {aula_id} = req.body
    const {usuario} = req

    try {
        if(!aula_id){
            return res.status(400).json({mensagem: "É necessário especificar a aula."})
        }

        const verificarAluno = await knex('aula_usuario').where({usuario_id: usuario.id, aula_id}).first()

        if(verificarAluno){
            return res.status(400).json({mensagem: "Já está inscrito para esta aula."})
        }

        const inscricao = await knex('aula_usuario')
        .insert({aula_id, usuario_id: usuario.id}).returning('*')

        return res.status(201).json(inscricao)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const listarAulas = async (req: Request, res:Response) => {
    try {
        const aulas = await knex('aulas')

        return res.status(200).json(aulas)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}

export const listarInscritosAulas = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const inscritos = await knex('aula_usuario')
        .join('usuarios',"aula_usuario.usuario_id", "usuarios.id")
        .join('aulas', 'aula_usuario.aula_id', 'aulas.id')
        .where({aula_id: id})

        return res.status(200).json(inscritos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}