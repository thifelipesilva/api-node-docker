const { Router } = require('express');
const PessoasController = require('../controller/PessoasController');

const router = Router();

router.get('/pessoas', PessoasController.mostraTodasPessoas);
router.get('/pessoas/ativas', PessoasController.mostraPessoasAtivas);
router.get('/pessoas/:id', PessoasController.mostraUmaPessoa);
router.post('/pessoas', PessoasController.criaPessoa);
router.put('/pessoas/:id', PessoasController.atualizaPessoa);
router.delete('/pessoas/:id', PessoasController.apagaPessoa);

router.post('/pessoas/:id/restaura', PessoasController.restauraRegistro)
router.post('/pessoas/:estudanteId/cancelamatricula', PessoasController.cancelaMatriculasPessoa);
router.get('/pessoas/:estudanteId/matricula', PessoasController.mostraMatriculasEstudante);

module.exports = router;

