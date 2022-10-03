const { Router } = require('express');
const TurmasController = require('../controller/TurmasController');

const router = Router();

router.get('/turmas', TurmasController.mostraTurmas);
router.get('/turmas/:id', TurmasController.mostraTurmaPorId);
router.post('/turmas', TurmasController.criaTurma);
router.put('/turmas/:id', TurmasController.atualizaTurma);
router.delete('/turmas/:id', TurmasController.deletaTurma);

module.exports = router;