const express = require('express');
const disciplina_controller = require('../Controllers/controller_disciplina');
const router = express.Router();
router.post('/registar_disciplina', disciplina_controller.registar_disciplina);
router.post('/listar_disciplina', disciplina_controller.listar_disciplina);

module.exports = app => app.use('/disciplina', router);


