import {Router} from 'express'
import { cadastrarAdmin, cadastrarAluno, cadastrarTutor } from './controladores/usuarios'

const rotas = Router()

rotas.post('/usuario', cadastrarAluno)

rotas.post('/admin', cadastrarAdmin)

rotas.post('/admin/tutor', cadastrarTutor)

export default rotas