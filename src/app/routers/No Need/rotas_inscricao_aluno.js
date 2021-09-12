const express = require('express');
const inscricao_aluno_controller = require('../Controllers/controller_inscricao_aluno');
const router = express.Router();
router.post('/registar_inscricao_aluno', inscricao_aluno_controller.registar_inscricao_aluno);
router.post('/listar_inscricao_aluno', inscricao_aluno_controller.listar_inscricao_aluno);

module.exports = app => app.use('/inscricao_aluno', router);


