const express = require('express');
const aluno_controller = require('../Controllers/controller_aluno');
const router = express.Router();
router.post('/registar_aluno', aluno_controller.registar_aluno);
router.post('/listar_aluno', aluno_controller.listar_aluno);
router.post('/listAlunoByID/:id', aluno_controller.listAlunoByID);
module.exports = app => app.use('/aluno', router);