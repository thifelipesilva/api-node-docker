const { Router } = require('express');
const NiveisController = require('../controller/NiveisController');

const router = Router();

router.get('/niveis', NiveisController.mostraNiveis);
router.get('/niveis/:id', NiveisController.mostraNivelPorId);
router.post('/niveis', NiveisController.criaNivel);
router.put('/niveis/:id', NiveisController.atualizaNivel);
router.delete('/niveis/:id', NiveisController.deletaNivel);

module.exports = router;