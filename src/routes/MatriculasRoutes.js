const { Router } = require('express');
const MatriculasController = require('../controller/MatriculasController');

const router = Router();

router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.mostraMatricula);
router.post('/pessoas/:estudanteId/matricula', MatriculasController.criaMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.deletaMatricula);

router.get('/pessoas/matricula/:turmaId/confirmadas', MatriculasController.mostraMatriculasPorTurma)
router.get('/pessoas/matricula/lotada', MatriculasController.mostraTurmasLotadas)

module.exports = router;