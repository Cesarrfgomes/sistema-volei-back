import {Request, Response} from 'express'
import { knex } from '../conexao'
import bcrypt from 'bcrypt'

export const cadastrarAluno = async (req: Request, res: Response) => {
    const {nome, email, senha, telefone} = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await knex('usuarios')
        .insert({nome, email, senha: senhaCriptografada, telefone})
        .returning('*')

        if(!novoUsuario){
            return res.status(400).json({mensagem: "Não foi possivel cadastrar um novo usuário."})
        }

        return res.status(201).json(novoUsuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const cadastrarTutor = async (req: Request, res: Response) => {
    const {nome, email, senha, telefone} = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await knex('usuarios')
        .insert({nome, email, senha: senhaCriptografada, telefone, cargo: "TUTOR"})
        .returning('*')

        if(!novoUsuario){
            return res.status(400).json({mensagem: "Não foi possivel cadastrar um novo usuário."})
        }

        return res.status(201).json(novoUsuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const cadastrarAdmin = async (req: Request, res: Response) => {
    const {nome, email, senha, telefone} = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await knex('usuarios')
        .insert({nome, email, senha: senhaCriptografada, telefone, cargo: "ADMINISTRADOR"})
        .returning('*')

        if(!novoUsuario){
            return res.status(400).json({mensagem: "Não foi possivel cadastrar um novo usuário."})
        }

        return res.status(201).json(novoUsuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const listarAlunos = async(req: Request, res: Response)=>{
    try {
        const alunos = await knex('usuarios').select('id', 'nome', 'email', 'telefone', 'cargo', 'time_id')
        .where('cargo', '=', 'ALUNO')

        return res.status(200).json(alunos)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const listarTutores = async(req: Request, res: Response)=>{
    try {
        const alunos = await knex('usuarios').select('id', 'nome', 'email', 'telefone', 'cargo', 'time_id')
        .where('cargo', '=', 'TUTOR')

        return res.status(200).json(alunos)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

