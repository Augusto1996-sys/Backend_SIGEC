const express = require('express');
const alocacao_turma_controller = require('../Controllers/controller_alocacao_turma');
const router = express.Router();
router.post('/registar_alocacao_turma', alocacao_turma_controller.registar_alocacao_turma);
router.post('/listar_alocacao_turma', alocacao_turma_controller.listar_alocacao_turma);

module.exports = app => app.use('/alocacao_turma', router);


