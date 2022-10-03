const { Router } = require('express');
const PessoasController = require('../controller/PessoasController');

const router = Router();

router.get('/pessoas', PessoasController.mostraPessoas);
router.get('/pessoas/:id', PessoasController.mostraUmaPessoa);
router.post('/pessoas', PessoasController.criaPessoa);
router.put('/pessoas/:id', PessoasController.atualizaPessoa);
router.delete('/pessoas/:id', PessoasController.apagaPessoa);

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoasController.mostraMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoasController.criaMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoasController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoasController.deletaMatricula);

module.exports = router;

