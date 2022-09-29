const { Router } = require('express');
const PessoasController = require('../controller/PessoasController');

const routes = Router();

routes.get('/pessoas', PessoasController.mostraPessoas);
routes.get('/pessoas/:id', PessoasController.mostraUmaPessoa);
routes.post('/pessoas', PessoasController.criaPessoa);
routes.put('/pessoas/:id', PessoasController.atualizaPessoa);
routes.delete('/pessoas/:id', PessoasController.apagaPessoa);

module.exports = routes;

