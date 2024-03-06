import {Router} from 'express'
import { cadastrarAdmin, cadastrarAluno, cadastrarTutor } from './controladores/usuarios'
import { verificarEmailEmUso } from './intermediarios/verificarEmail'
import { login } from './controladores/login'

const rotas = Router()

rotas.post('/usuario', verificarEmailEmUso,cadastrarAluno)

rotas.post('/admin', verificarEmailEmUso, cadastrarAdmin)

rotas.post('/admin/tutor', verificarEmailEmUso, cadastrarTutor)

rotas.post('/login', login)

export default rotas