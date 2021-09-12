const express = require('express');
const funcao_usuario_controller = require('../Controllers/controller_funcao_usuario');
const router = express.Router();
router.post('/registar_funcao_usuario', funcao_usuario_controller.registar_funcao_usuario);
router.post('/listar_funcao_usuario', funcao_usuario_controller.listar_funcao_usuario);

module.exports = app => app.use('/funcao_usuario', router);


