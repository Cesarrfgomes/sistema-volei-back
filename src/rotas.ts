import { Router } from 'express'
import { cadastrarAdmin, cadastrarAluno, cadastrarTutor, listarAlunos, listarTutores } from './controladores/usuarios'
import { verificarEmailEmUso } from './intermediarios/verificarEmail'
import { login } from './controladores/login'
import { validarToken } from './intermediarios/validacaoToken'
import { cadastrarAula, editarAula, inscricaoAula, listarAulas, listarInscritosAulas } from './controladores/aulas'
import { cadastrarTorneio, detalharTorneio, editarTorneiro, excluirTorneio, listarTorneios } from './controladores/torneios'
import { verificarTorneiroPorID, verificarTorneiroPorNome } from './intermediarios/verificarTorneiroExiste'

const rotas = Router()

rotas.post('/usuario', verificarEmailEmUso, cadastrarAluno)
rotas.post('/admin', verificarEmailEmUso, cadastrarAdmin)
rotas.post('/admin/tutor', verificarEmailEmUso, cadastrarTutor)
rotas.post('/login', login)

rotas.use(validarToken)

rotas.get('/usuario', listarAlunos)
rotas.get('/admin/tutor', listarTutores)

rotas.post('/aula', cadastrarAula)
rotas.put('/aula/:id', editarAula)
rotas.get('/aula', listarAulas)
rotas.post('/aula/inscricao', inscricaoAula)
rotas.get('/aula/inscritos/:id', listarInscritosAulas)

rotas.post('/torneio', verificarTorneiroPorNome, cadastrarTorneio)
rotas.get('/torneio', listarTorneios)
rotas.get('/torneio/:id', verificarTorneiroPorID, detalharTorneio)
rotas.put('/torneio/:id', verificarTorneiroPorID, editarTorneiro)
rotas.delete('/torneio/:id', verificarTorneiroPorID, excluirTorneio)

export default rotas