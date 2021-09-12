const express = require('express');
const turma_controller = require('../Controllers/controller_turma');
const router = express.Router();
router.post('/registar_turma', turma_controller.registar_turma);
router.post('/listar_turma', turma_controller.listar_turma);

module.exports = app => app.use('/turma', router);


