const express = require('express');
const funcionario_controller = require('../Controllers/controller_funcionario');
const router = express.Router();
router.post('/registar_funcionario', funcionario_controller.registar_funcionario);
router.post('/listar_funcionario', funcionario_controller.listar_funcionario);
router.post('/deleteFuncionarioByID/:id', funcionario_controller.deletefuncionario);
router.post('/editarfuncionarioByID', funcionario_controller.updatefuncionario);
module.exports = app => app.use('/funcionario', router);


